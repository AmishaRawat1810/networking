onload = () => {
  document.body.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    console.log(y, x, e);
    document.body.style.background =
      `radial-gradient(circle at ${x}% ${y}%, orange, transparent 2%, transparent)`;
  });
};
