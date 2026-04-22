import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
  title: string;

  message: string;

  imageUrl: string;
};

export default function Component(props: Props) {
  return <Card sx={{ width: 330 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={props.imageUrl}
      title="green iguana"
    />

    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.title}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {props.message}
      </Typography>
    </CardContent>

    <CardActions>
      <Button size="small">Share</Button>

      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
}

