import useStyles from "./styles/FormImageList";

interface FormImageListProps {
  images: string[];
}

function FormImageList({ images }: FormImageListProps) {
  const classes = useStyles();

  const thumbs = images.map((image, idx) => (
    <div className={classes.thumbnail} key={idx}>
      <div className={classes.thumbInner}>
        <img alt="" src={image} className={classes.thumbImg} />
      </div>
    </div>
  ));

  return <aside className={classes.thumbnailContainer}>{thumbs}</aside>;
}

export default FormImageList;
