import { useState } from 'react';
import styles from './css/CommentStyle.module.css'

const CommentComponent = (props) => {

    const{ comment, comments, setComment, setComments} = props;
    const onChangeHandler = (e) => {
        setComment(e.target.value)
    }
    const onClickHandler =() => {
        setComments((comments) => [...comments, comment]);
    }
    return(
        <div className={styles.mainContainer}>
            <div className={styles.commentFlexbox}>
                <h3 className={styles.commentText}>Comments</h3>
                <textarea 
                    value={comment}
                    className={styles.inputBox}
                    onChange={onChangeHandler}
                />
                <button 
                    className={styles.commentButton}
                    onClick={onClickHandler}
                    
                    >Submit</button>
                {comments.map((text)=>(
                    <div key={text.id} className={styles.commentContainer}>{comment}</div>
                ))}
            </div>
        </div>
    )
}
export default CommentComponent;