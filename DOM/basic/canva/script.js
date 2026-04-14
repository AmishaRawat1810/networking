const drawLine = () => {
  const c = document.querySelector('#canva');
  const container = document.querySelector('main');
  const context = c.getContext("2d");
  context.moveTo(0,0);
  context.lineTo(container.clientHeight, container.clientHeight);
  context.stroke();
}

onload = drawLine;