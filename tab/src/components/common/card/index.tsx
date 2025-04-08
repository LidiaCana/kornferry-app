import React from "react";
import "./card.css";
import { Box, Card as CardMUI, CardProps, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
interface CardProp extends Omit<CardProps, "content"> {
  topText: string;
  content: { text: string; color?: string };
  bottomText: { text: string; color?: string };
  link?: string;
}
const Card: React.FC<CardProp> = ({
  topText,
  content: content,
  bottomText,
  link,
  ...props
}) => {
  return (
    <CardMUI {...props}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Typography
          gutterBottom
          sx={{
            color: "text.secondary",
            fontSize: 14,
            textAlign: "left",
            ml: 2,
          }}
        >
          {topText}
        </Typography>
        <a
          href={link}
          target="_blank"
          style={{ textDecoration: "none", color: "gray" }}
        >
          <RemoveRedEyeIcon />
        </a>
      </Box>
      <Typography variant="h5" component="div">
        <span className={content.color || "green"}>{content.text}</span>
      </Typography>
      <Typography sx={{ color: bottomText.color, mb: 1.5, fontSize: 12 }}>
        {bottomText.text}
      </Typography>
    </CardMUI>
  );
};
export default Card;
