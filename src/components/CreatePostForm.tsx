import "emoji-mart/css/emoji-mart.css";

import { useRef, useState, useEffect, FormEvent, ChangeEvent } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Image from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import { Picker, EmojiData } from "emoji-mart";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import FormImageList from "./FormImageList";
import useStyles from "./styles/CreatePostForm";

const UPPER_LIMIT = 300;

interface ImagesWithUrls {
  urls: string[];
  files?: FileList;
}

function CreatePostForm() {
  const classes = useStyles();

  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [images, setImages] = useState<ImagesWithUrls>({ urls: [] });

  useEffect(() => {
    if (body.length > UPPER_LIMIT) setError(`${body.length} / ${UPPER_LIMIT}`);
    else setError("");
  }, [body]);

  useEffect(() => {
    let tempUrls: string[] = [];
    if (images.files) {
      for (let i = 0; i < images.files.length; ++i)
        tempUrls.push(URL.createObjectURL(images.files[i]));
      setImages({ ...images, urls: tempUrls });
    }
  }, [images]);

  const addEmoji = (emoji: EmojiData) => {
    if ("native" in emoji) {
      setBody(`${body}${emoji.native}`);
    }
    setShowPicker(false);
    inputRef.current!.focus();
  };

  const handleImageUploadBtn = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages({ ...images, files: e.target.files });
  };

  const handleCreateFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(body);
    setBody("");
  };

  return (
    <>
      <Paper elevation={5} className={classes.form}>
        <form onSubmit={handleCreateFormSubmit}>
          <TextField
            rows={3}
            required
            autoFocus
            multiline
            fullWidth
            rowsMax={30}
            value={body}
            variant="outlined"
            inputRef={inputRef}
            error={error.length !== 0}
            placeholder="What's happening?"
            onChange={(e) => setBody(e.target.value)}
            helperText={
              error.length === 0 ? `${body.length} / ${UPPER_LIMIT}` : error
            }
          />
        </form>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <IconButton title="Images" component="label">
              <Image />
              <input
                hidden
                multiple
                type="file"
                onChange={handleImageUploadBtn}
                accept="image/x-png,image/gif,image/jpeg"
              />
            </IconButton>
            <IconButton
              title="Emoji"
              onClick={() => setShowPicker(!showPicker)}
            >
              <EmojiEmotionsIcon />
            </IconButton>
          </Grid>
          <Grid item md={9}>
            <Typography align="right">
              <Button className="white" color="primary" variant="contained">
                Post
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {images.urls.length !== 0 && <FormImageList images={images.urls} />}
      {showPicker && (
        <Picker
          emoji=""
          set="twitter"
          autoFocus={true}
          onSelect={addEmoji}
          showPreview={false}
          showSkinTones={false}
        />
      )}
    </>
  );
}

export default CreatePostForm;
