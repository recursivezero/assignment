export const generateImage = ({
  title,
  data,
  canvas,
  canvasContainer,
  downloadButton,
  canvasWidth = 400,
  canvasHeight = 300,
  backgroundColor = "#90EE90",
  borderColor = "#FF69B4",
  borderThickness = 4,
}) => {
  const context = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = borderColor;
  context.lineWidth = borderThickness;
  context.strokeRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#8B0000";
  context.font = "bold 22px Arial";
  context.textAlign = "center";
  context.fillText(title, canvasWidth / 2, 50);

  context.textAlign = "left";
  const startX = 94;
  let startY = 100;
  const lineHeight = 30;
  const labelValueGap = 10;

  const detailType = Object.keys(data)[0];
  const details = data[detailType];

  details.forEach((detail, index) => {
    context.fillStyle = "#ff0000";
    context.font = "bold 16px Arial";
    context.fillText(detail.label, startX, startY + index * lineHeight);

    context.fillStyle = "#333";
    context.font = "bold 14px Arial";
    context.fillText(
      detail.value,
      startX + 110 + labelValueGap,
      startY + index * lineHeight
    );
  });

  canvasContainer.style.display = "block";
  downloadButton.style.display = "block";

  downloadButton.onclick = () => {
    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `${title
      .replace(/--/g, "")
      .trim()}_${new Date().getTime()}.png`;
    link.click();

    canvasContainer.style.display = "none";
    downloadButton.style.display = "none";
  };
};
