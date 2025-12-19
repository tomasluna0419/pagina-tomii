/* SELECTORES */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

/* FILTRO DE PROYECTOS */
(function(){
  const cont = $('[data-projects]');
  if(!cont) return;

  const chips = $$('[data-chip]');
  const cards = $$('[data-project]');

  chips.forEach(ch=>{
    ch.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('active'));
      ch.classList.add('active');

      const cat = ch.dataset.chip;

      cards.forEach(card=>{
        const ok = cat === "todos" || card.dataset.cat.split(',').includes(cat);
        card.style.display = ok ? "" : "none";
      });
    });
  });
})();

/* CALCULADORA DE IMPACTO */
(function(){
  const form = $('#calcImpacto');
  if(!form) return;

  form.addEventListener('input', ()=>{
    const don = Number($('#donaciones').value || 0);
    const hrs = Number($('#horas').value || 0);

    const kits = Math.floor(don / 8000);
    const animals = Math.floor(hrs / 3);

    $('#outKits').textContent = kits;
    $('#outAnimales').textContent = animals;
  });
})();

/* TABLA APP JS */
(function(){
  const table = $('#tablaProyectos');
  if(!table) return;

  const data = [
    {nombre:'Rescate de invierno', categoria:'rescate', estado:'En curso', avance:72},
    {nombre:'Adopción CABA', categoria:'adopcion', estado:'Planificado', avance:15},
    {nombre:'Esterilización barrial', categoria:'conservacion', estado:'Finalizado', avance:100},
    {nombre:'Refugio transitorio', categoria:'rescate', estado:'En curso', avance:41},
  ];

  const tbody = $('tbody', table);
  const render = rows => {
    tbody.innerHTML = rows.map(r=>`
      <tr>
        <td>${r.nombre}</td>
        <td><span class="badge">${r.categoria}</span></td>
        <td>${r.estado}</td>
        <td>${r.avance}%</td>
      </tr>`).join('');
  };

  render(data);

  $('#filtroCategoria').addEventListener('change', e=>{
    const cat = e.target.value;
    render(cat==="todos" ? data : data.filter(x=>x.categoria===cat));
  });
})();