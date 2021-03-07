import "emoji-mart/css/emoji-mart.css";

import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Image from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import { EmojiData, Picker } from "emoji-mart";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import { createPost } from "../api/blog";
import FormImageList from "./FormImageList";
import { useToken } from "../store/auth/hooks";
import useStyles from "./styles/CreatePostForm";
import { prependPost } from "../store/blog/actions";
import { useDialogPost } from "../store/blog/hooks";
import {
  Post,
  POST_DIALOG_REPLY,
  POST_DIALOG_REPOST,
} from "../store/blog/types";

const UPPER_LIMIT = 300;

interface ImagesWithUrls {
  urls: string[];
  files?: FileList;
}

interface CreatePostFormProps {
  elevation?: number;
}

function CreatePostForm({ elevation = 5 }: CreatePostFormProps) {
  const classes = useStyles();

  const token = useToken();
  const dialogState = useDialogPost();

  const dispatch = useDispatch();
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

  const handlePostCreation = (post: Post) => {
    post.heart_count = 0;
    post.reply_count = 0;
    post.repost_count = 0;
    dispatch(prependPost(post));
  };

  const handlePostCreate = () => {
    const empty = body.replace(/\s+/g, " ").trim().length === 0;
    if (empty) return;
    if (dialogState) {
      const dialogPost = dialogState.post;
      switch (dialogState.type) {
        case POST_DIALOG_REPLY:
          createPost(token!, body, { reply_to_id: dialogPost.id }).then(
            handlePostCreation
          );
          break;
        case POST_DIALOG_REPOST:
          createPost(token!, body, { repost_of_id: dialogPost.id }).then(
            handlePostCreation
          );
          break;
      }
    } else createPost(token!, body).then(handlePostCreation);
    setBody("");
  };

  const handleCreateFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePostCreate();
  };

  return (
    <>
      <Paper elevation={elevation} className={classes.form}>
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
        <Grid container>
          <Grid item xs={4} md={3}>
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
          <Grid item xs={7} md={9}>
            <Typography align="right">
              <Button
                color="primary"
                className="white"
                variant="contained"
                onClick={() => handlePostCreate()}
                disabled={body.replace(/\s+/g, " ").trim().length === 0}
              >
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
