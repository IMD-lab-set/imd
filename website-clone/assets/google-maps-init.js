// Google Maps initializer and integration for IMD stations & tour planning
// Requires a simple config file at /website-clone/gmaps-config.json with { "API_KEY": "YOUR_KEY" }
(function(){
  const CONFIG_PATH = '/website-clone/gmaps-config.json';

  function loadConfig(){
    return fetch(CONFIG_PATH).then(r=>r.ok?r.json():{}).catch(()=>({}));
  }

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.async=true;
      s.defer=true;
      s.onload=()=>resolve();
      s.onerror=(e)=>reject(e);
      document.head.appendChild(s);
    });
  }

  function createMap(container){
    const map = new google.maps.Map(container, {
      center: { lat: 11.0, lng: 78.0 },
      zoom: 7,
      mapTypeControl: true
    });
    return map;
  }

  function parseCoordinates(text){
    // Possible formats: "12.34°N, 78.90°E" or "12.34,78.90" or "12.34 N, 78.90 E"
    if(!text) return null;
    const nums = text.match(/-?\d+\.\d+/g);
    if(nums && nums.length>=2){
      const lat = parseFloat(nums[0]);
      const lng = parseFloat(nums[1]);
      return {lat, lng};
    }
    return null;
  }

  function attachPopupObserver(map, markers){
    const body = document.body;
    const mo = new MutationObserver(muts=>{
      for(const m of muts){
        for(const n of m.addedNodes){
          if(!(n instanceof HTMLElement)) continue;
          if(n.matches && n.matches('.popup-overlay')){
            // read station title
            const title = n.querySelector('.popup-title')?.textContent?.trim();
            // find coordinates row
            const coordsNode = Array.from(n.querySelectorAll('.popup-row')).find(r=>/Coordinates/i.test(r.textContent||''));
            const coordText = coordsNode?.querySelector('.popup-val')?.textContent || coordsNode?.textContent;
            const coords = parseCoordinates(coordText);
            if(coords){
              // clear previous markers for popup (optional)
              markers.forEach(m=>m.setMap(null));
              markers.length = 0;
              const mk = new google.maps.Marker({position: coords, map});
              markers.push(mk);
              map.panTo(coords);
              map.setZoom(12);
              const inf = new google.maps.InfoWindow({content: `<div style="font-weight:700">${title||'Station'}</div><div style="font-size:12px">${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}</div>`});
              inf.open({map, anchor: mk});
            }
          }
        }
      }
    });
    mo.observe(body, { childList: true, subtree: true });
  }

  function wireTourForm(map, directionsRenderer, directionsService){
    const form = document.querySelector('.tour-form');
    if(!form) return;
    form.addEventListener('submit', async (ev)=>{
      ev.preventDefault();
      // find inputs: start / end / waypoints
      const startInput = form.querySelector('input[name="start"], input.start, input[data-start]');
      const endInput = form.querySelector('input[name="end"], input.end, input[data-end]');
      const start = startInput?.value || '';
      const end = endInput?.value || '';
      if(!start || !end) return alert('Please enter start and end locations');
      const req = { origin: start, destination: end, travelMode: 'DRIVING' };
      directionsService.route(req, (result, status) => {
        if(status === 'OK'){
          directionsRenderer.setDirections(result);
          populateRouteSteps(result);
        } else {
          alert('Directions request failed: ' + status);
        }
      });
    });

    function populateRouteSteps(result){
      const out = document.querySelector('.route-output');
      if(!out) return;
      out.innerHTML = '';
      const legs = result.routes?.[0]?.legs || [];
      legs.forEach((leg,i)=>{
        leg.steps.forEach((s,j)=>{
          const d = document.createElement('div');
          d.className = 'route-step';
          d.innerHTML = `${s.distance?.text||''} — ${s.instructions}`;
          d.addEventListener('click', ()=>{
            const pos = s.end_location;
            map.panTo({lat: pos.lat(), lng: pos.lng()});
            map.setZoom(15);
          });
          out.appendChild(d);
        });
      });
    }
  }

  // Entry
  document.addEventListener('DOMContentLoaded', async ()=>{
    const cfg = await loadConfig();
    const apiKey = cfg.API_KEY || cfg.key || '';
    // create map container inside .map-container
    const containerWrap = document.querySelector('.map-container');
    if(!containerWrap) return;
    // replace existing SVG/map area with a div
    const mapDiv = document.createElement('div');
    mapDiv.id = 'imd-map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '420px';
    // remove any existing map-svg
    const old = containerWrap.querySelector('.map-svg');
    if(old) old.remove();
    containerWrap.appendChild(mapDiv);

    if(!apiKey){
      console.warn('Google Maps API key not found in /website-clone/gmaps-config.json. Map will not load.');
      mapDiv.innerHTML = '<div style="padding:24px;color:#666">Google Maps not configured. Place API key in /website-clone/gmaps-config.json</div>';
      return;
    }

    // load Google Maps JS with callback
    const callbackName = '__initIMDMap';
    window[callbackName] = ()=>{
      try{
        const map = createMap(mapDiv);
        const markers = [];
        attachPopupObserver(map, markers);
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({map});
        wireTourForm(map, directionsRenderer, directionsService);
        wireStationSelector(map);
      }catch(e){console.error(e)}
    };

    function wireStationSelector(map){
      const container = document.body;
      function attachToItem(item){
        if(item._imdAttached) return; item._imdAttached = true;
        item.addEventListener('click', (ev)=>{
          // find station name or id inside the item
          const nameEl = item.querySelector('.s-name');
          const idEl = item.querySelector('.s-id');
          const text = (nameEl?.textContent || idEl?.textContent || item.textContent || '').trim();
          if(!text) return;
          // try to find matching row in stations table and click its View button
          const tableRows = Array.from(document.querySelectorAll('table tbody tr'));
          for(const r of tableRows){
            if(r.textContent && r.textContent.toLowerCase().includes(text.toLowerCase())){
              const btn = Array.from(r.querySelectorAll('button')).find(b=>/view/i.test(b.textContent||''));
              if(btn){
                btn.click();
                return;
              }
            }
          }
          // fallback: if there's a list/table of stations elsewhere with matching id cell
          const rows = Array.from(document.querySelectorAll('tr'));
          for(const r of rows){
            if(r.textContent && r.textContent.toLowerCase().includes(text.toLowerCase())){
              const btn = Array.from(r.querySelectorAll('button')).find(b=>/view/i.test(b.textContent||''));
              if(btn){ btn.click(); return; }
            }
          }
        });
      }

      // Attach to existing items
      const items = container.querySelectorAll('.station-sel-item');
      items.forEach(attachToItem);

      // Observe for dynamically added items
      const mo = new MutationObserver(muts=>{
        for(const m of muts){
          for(const n of m.addedNodes){
            if(!(n instanceof HTMLElement)) continue;
            if(n.matches && n.matches('.station-sel-item')) attachToItem(n);
            // also check children
            const sel = n.querySelectorAll && n.querySelectorAll('.station-sel-item');
            if(sel && sel.length) sel.forEach(attachToItem);
          }
        }
      });
      mo.observe(container, {childList:true, subtree:true});
    }

    const mapsSrc = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&callback=${callbackName}`;
    try{
      await loadScript(mapsSrc);
    }catch(e){
      console.error('Failed to load Google Maps script', e);
      mapDiv.innerHTML = '<div style="padding:24px;color:#c62828">Failed to load Google Maps script. Check API key and network.</div>';
    }
  });
})();
