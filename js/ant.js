const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

d3.json("data/data.json").then(data => {
  const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.coordX)).range([50, width - 50]);
  const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.coordY)).range([50, height - 50]);
  const addomeScale = d3.scaleLinear().domain(d3.extent(data, d => d.dimAddome)).range([5, 25]);
  const antennaScale = d3.scaleLinear().domain(d3.extent(data, d => d.lungAntenne)).range([10, 50]);
  const zampeScale = d3.scaleLinear().domain(d3.extent(data, d => d.lungZampe)).range([2, 6]);
  const testaScale = d3.scaleLinear().domain(d3.extent(data, d => d.dimTesta)).range([5, 15]);

  let selected = null;

  const g = svg.selectAll(".ant")
    .data(data)
    .enter().append("g")
    .attr("class", "ant")
    .attr("transform", d => `translate(${xScale(d.coordX)}, ${yScale(d.coordY)})`)
    .on("click", function(event, d) {
      if (!selected) {
        selected = d;
        d3.select(this).classed("selected", true);
      } else if (selected !== d) {
        // Scambio tutte le proprietà
        [selected.dimAddome, d.dimAddome] = [d.dimAddome, selected.dimAddome];
        [selected.lungAntenne, d.lungAntenne] = [d.lungAntenne, selected.lungAntenne];
        [selected.lungZampe, d.lungZampe] = [d.lungZampe, selected.lungZampe];
        [selected.dimTesta, d.dimTesta] = [d.dimTesta, selected.dimTesta];
        //[selected.colore, d.colore] = [d.colore, selected.colore];

        update();
        svg.selectAll(".selected").classed("selected", false);
        selected = null;
      }
    });


  /* ZAMPE */
  const numZampe = 3;  // tre zampe a lato
  g.each(function(d) {
    const group = d3.select(this);
    for (let i = 0; i < numZampe; i++) {
      group.append("line")
        .attr("class", `leg legL legL${i}`)
        .attr("stroke", d.colore)
        .attr("stroke-width", 2);
      group.append("line")
        .attr("class", `leg legR legR${i}`)
        .attr("stroke", d.colore)
        .attr("stroke-width", 2);
    }
  });

  /* ADDOME */
  g.append("ellipse") 
    .attr("class", "abdomen")
    .attr("cx", 0)
    .attr("cy", 15)
    .attr("rx", d => addomeScale(d.dimAddome) * 1.5)
    .attr("ry", d => addomeScale(d.dimAddome))
    .attr("fill", d => d.colore);

  /* TORACE */
  g.append("ellipse")  
    .attr("class", "thorax")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("rx", d => addomeScale(d.dimAddome) * 0.8)
    .attr("ry", d => addomeScale(d.dimAddome) * 0.6)
    .attr("fill", d => d3.color(d.colore).darker(1));

  /* TESTA */
  g.append("circle")  
    .attr("class", "head")
    .attr("cx", 0)
    .attr("cy", -15)
    .attr("r", d => testaScale(d.dimTesta))
    .attr("fill", d => d.colore);

  /* ANTENNE sinistra e destra */
  g.append("path")
    .attr("class", "antennaL")
    .attr("stroke", d => d.colore)
    .attr("stroke-width", 2)
    .attr("fill", "none");

  g.append("path")
    .attr("class", "antennaR")
    .attr("stroke", d => d.colore)
    .attr("stroke-width", 2)
    .attr("fill", "none");


  function update() {
    g.transition().duration(500)
    .attr("transform", d => `translate(${xScale(d.coordX)},${yScale(d.coordY)})`);

    /* Addome */
    g.select(".abdomen").transition().duration(500)
      .attr("rx", d => addomeScale(d.dimAddome) * 1.5)
      .attr("ry", d => addomeScale(d.dimAddome))
      .attr("fill", d => d.colore);

    /* Torace */
    g.select(".thorax").transition().duration(500)
      .attr("rx", d => addomeScale(d.dimAddome) * 0.8)
      .attr("ry", d => addomeScale(d.dimAddome) * 0.6)
      .attr("fill", d => d3.color(d.colore).darker(1));

    /* Testa */
    g.select(".head").transition().duration(500)
      .attr("r", d => testaScale(d.dimTesta))
      .attr("fill", d => d.colore);

    /* Antenne */
    g.select(".antennaL").transition().duration(500)
      .attr("d", d => {
        let len = antennaScale(d.lungAntenne);
        return `M -3 -15 Q ${-len*0.5} ${-len*0.7} ${-len*0.8} ${-len*1.2}`;
      })
      .attr("stroke", d => d.colore);

    g.select(".antennaR").transition().duration(500)
      .attr("d", d => {
        let len = antennaScale(d.lungAntenne);
        return `M 3 -15 Q ${len*0.5} ${-len*0.7} ${len*0.8} ${-len*1.2}`;
      })
      .attr("stroke", d => d.colore);

    /* Zampe */ 
    const direzioneZampe = [
      { dx: -1.2, dy: -1 }, // anteriore
      { dx: -1.2, dy: 0 },  // centrale
      { dx: -1, dy: 1 }     // posteriore
    ];

    g.each(function(d) {
      const scale = zampeScale(d.lungZampe);
      const baseX = addomeScale(d.dimAddome) * 0.8;
      const baseY = 0; // stesso punto di inizio disegno per tutte le zampe

      const group = d3.select(this);

      direzioneZampe
      .forEach((dir, i) => {
        // zampe a sinistra
        group.select(`.legL${i}`)
          .transition().duration(500)
          .attr("x1", -baseX)
          .attr("y1", baseY)
          .attr("x2", -baseX + dir.dx * scale * 5)
          .attr("y2", baseY + dir.dy * scale * 5)
          .attr("stroke", d.colore);

        // zampe a destra
        group.select(`.legR${i}`)
          .transition().duration(500)
          .attr("x1", baseX)
          .attr("y1", baseY)
          .attr("x2", baseX - dir.dx * scale * 5)
          .attr("y2", baseY + dir.dy * scale * 5)
          .attr("stroke", d.colore);
      });
    });
  }

  update();
});
