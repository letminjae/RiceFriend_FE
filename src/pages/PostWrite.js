import React, { useState } from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import { yellow, grey } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import moment from "moment";
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1045,
    minWidth: 345,
    backgroundColor: grey[200],
  },
}));
const PostWrite = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch()
  const post = useSelector(state => state.post.list)
  const [postInfo, setPostInfo] = useState([])

  const [meetingTitle, setMeetingTitle] = useState()
  const [restaurantName, setRestaurantName] = useState();
  const [limitMember, setlimitMember] = useState();
  const [locationId, setlocationId] = useState();
  const [meetingDate, setmeetingDate] = useState();
  const [content, setContent] = useState()
  const date = moment().format("YYYY-MM-DD")

  const [imageFile, setImageFile] = useState(null);

  const preview = useSelector(state => state.image.preview)


  const fileInput = React.useRef();

  const filePreview = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
    if (file) {
      setImageFile(file)
    }

  };

  const addpost = () => {

    // ???????????? ??????
    let formData = new FormData()
    // ?????? ????????? ??????
    const data = {
      meetingTitle: meetingTitle,
      restaurantName: restaurantName,
      content: content,
      limitMember: limitMember,
      locationId: locationId,
      meetingDate: meetingDate,
    };

    // ??????????????? ????????? ????????? ??????
    formData.append("image", imageFile)
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    dispatch(postActions.addPostAction(formData))
  }


  //????????????

  const id = props.match.params.meetingId;
  const is_edit = id ? true : false

  console.log(id)
  console.log(is_edit)
  // let postInfo = is_edit ? post.find((p) => p.postId === id) : null

  const editpost = () => {

    let formData = new FormData()
    // ?????? ????????? ??????
    const data = {
      meetingTitle: meetingTitle,
      restaurantName: restaurantName,
      content: content,
      limitMember: limitMember,
      locationId: locationId,
      meetingDate: meetingDate,
    };

    formData.append("image", imageFile)
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    dispatch(postActions.editPostAction(id, formData))
  }



  const handleRegion = (e) => {
    setlocationId(e.target.value);
  };
  const handlePeople = (e) => {
    setlimitMember(e.target.value);
  };
  const handlename = (e) => {
    setMeetingTitle(e.target.value);
  };
  const handlerest = (e) => {
    setRestaurantName(e.target.value);
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleDate = (e) => {
    setmeetingDate(e.target.value)
  }

  const ElInput = styled('input')({
    display: 'none',
  });

  return (
    <React.Fragment>
      <Grid margin="auto" width="980px">

        <Card className={classes.root}>
          <Grid padding="20px 0px 0px 0px" margin="0px">

            <Text centertext bold size="40px">????????? ??????</Text>
            <TableHeader>
              <Grid padding="5px 5px 5px 5px" >
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    shape="preview"
                    src={preview ? preview : "http://via.placeholder.com/400x300"}
                  />
                </div>
                <Stack alignItems="center" spacing={2} fontSize="25px">
                  <label htmlFor="icon-button-file">
                    ??????????????? ???????????????
                    <ElInput ref={fileInput} onChange={filePreview} accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Stack>
              </Grid>

              <Grid margin="0px 45px 30px 0px">

                <Grid padding="15px" margin="10px 0px 0px 0px">
                  <Box sx={{ minWidth: 120 }} paddingBottom="7px">
                    <FormControl fullWidth>
                      <TextField
                        variant="standard" fullWidth label="????????????" id="meetingTitle" value={meetingTitle || ""}
                        onChange={handlename} />
                    </FormControl>
                  </Box>

                  <br />

                  <Box sx={{ minWidth: 120 }} paddingBottom="7px">
                    <FormControl fullWidth>
                      <TextField
                        variant="standard" fullWidth label="????????????" id="name" value={restaurantName || ""}
                        onChange={handlerest} />
                    </FormControl>
                  </Box>

                  <br />

                  <Box sx={{ minWidth: 120 }} paddingBottom="7px">
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard" id="demo-simple-select-label">????????????</InputLabel>
                      <Select
                        variant="standard"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={locationId || ""}
                        label="????????????"
                        onChange={handleRegion}
                      >
                        <MenuItem value={11}>??????</MenuItem>
                        <MenuItem value={28}>??????</MenuItem>
                        <MenuItem value={30}>??????</MenuItem>
                        <MenuItem value={29}>??????</MenuItem>
                        <MenuItem value={27}>??????</MenuItem>
                        <MenuItem value={31}>??????</MenuItem>
                        <MenuItem value={26}>??????</MenuItem>
                        <MenuItem value={41}>??????</MenuItem>
                        <MenuItem value={42}>??????</MenuItem>
                        <MenuItem value={43}>??????</MenuItem>
                        <MenuItem value={44}>??????</MenuItem>
                        <MenuItem value={45}>??????</MenuItem>
                        <MenuItem value={46}>??????</MenuItem>
                        <MenuItem value={47}>??????</MenuItem>
                        <MenuItem value={48}>??????</MenuItem>
                        <MenuItem value={50}>??????</MenuItem>
                        <MenuItem value={36}>??????</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <br />
                  <Box sx={{ minWidth: 120 }} paddingBottom="7px">
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard" id="demo-simple-select-label">????????????</InputLabel>
                      <Select
                        variant="standard"
                        defaultValue=""
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={limitMember || ""}
                        label="????????????"
                        onChange={handlePeople}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Grid padding="23px 0px" >
                    <FormControl fullWidth>

                      <TextField
                        variant="standard"
                        fullWidth
                        defaultValue={date}
                        onChange={handleDate}
                        id="datetime-local"
                        label="?????????"
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                    </FormControl>

                  </Grid>
                </Grid>
              </Grid>
            </TableHeader>
            <hr style={{ border: "1px solid lightgrey", margin: "0px 50px 30px 50px" }} />

            <Grid padding="0px 50px 0px 50px">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <TextField id="outlined-multiline-flexible"
                    placeholder='????????? ????????? ?????????!'
                    multiline
                    rows={5}
                    value={content}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>


            </Grid>
          </Grid>
          <Grid padding="20px 350px 20px 350px" >
            {is_edit ? (
              <Button text="????????? ??????" _onClick={editpost}></Button>
            ) : (
              <Button text="????????? ??????" _onClick={addpost}></Button>
            )}
          </Grid>
        </Card>
      </Grid>
    </React.Fragment >
  );
};


const TableHeader = styled.div`
    columns: 2;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
  `;

const Wrap = styled.div`
max-width : 1100px;
min-width:  920px;
min-height : 100vh;
margin : auto;
`

export default PostWrite;