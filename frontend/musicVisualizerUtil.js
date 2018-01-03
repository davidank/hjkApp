
const init = () => {
  const canvas = document.getElementById('musicVisualizer');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'green';
  ctx.fillRect(10, 10, 100, 100);
};

export default init;