import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Typography, Button} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyle from './styles';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';

const Post = ({post, setCurrentId})=>{
    const user = JSON.parse(localStorage.getItem('profile')) || null;
    const Likes = () => {
        if (post?.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    const classes = useStyle();
    const dispatch = useDispatch();
    return (<Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
            </div>
            {user?.result.googleId === post?.creator || user?.result._id === post?.creator ?
                <div className={classes.overlay2}>
                    <Button style={{color: "white"}} size="small" onClick={()=>setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div> : null
            }
        </CardMedia>
        <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags && post.tags.map((tag)=>`#${tag} `)}</Typography>
        </div>
        <Typography variant="h5" gutterBottom className={classes.title}>{post.title}</Typography>
        <CardContent>
                <Typography variant="h5" gutterBottom>{post.message}</Typography>
        </CardContent>
        
            <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                        <Likes />
                    </Button>
                    {user?.result.googleId === post?.creator || user?.result._id === post?.creator ?
                        <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize='small'/>
                            Delete
                        </Button>
                    : null}
            </CardActions>
            
    </Card>);
};

export default Post;