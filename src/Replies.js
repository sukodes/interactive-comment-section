import React, {useState} from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import {MdDelete} from 'react-icons/md'
import {MdOutlineEdit} from 'react-icons/md'
import { useGlobalContext } from './Context'
import {v4 as uuid} from 'uuid';

const Replies = ({reply, commentId}) => {
   const {id, content, createdAt, user, score, replyingTo} = reply;
   const { state, toggleReplyScore, handleReplyToReply, handleReplyDelete, handleReplyEdit } = useGlobalContext();
   const { username, image } = user;
   const [ showReply, setShowReply ] = useState(false)
   const [ newContent, setNewContent ] = useState('');
   const [isEditing, setIsEditing] = useState(false);
   const [editId, setEditId] = useState(null)
   const generateNewId = uuid();
  
   const initializeEdit = () => {
     setShowReply(true);
     setIsEditing(true);
     setEditId(id);
   }

   const setToDefault = () => {
     setNewContent('')
     setShowReply(false);
     setEditId(null)
   }

  return (

    <article className='comment reply'>
        
    <section>
    <header className='comment_header'>
     <img src={image.png} alt={`${username} 'img'`}/>
     <h1>{username}</h1>
     <p>{createdAt}</p>
   </header>

     <p><span>@{replyingTo}</span> {content}</p>
{/* <span>@{replyingTo}</span> */}
  
   <div className='toggle'>
     <p>
    <button onClick={() => toggleReplyScore(id, 'inc')}>
      {/* type inc for the increment btn*/}
      <AiOutlinePlus />
    </button>
    <span>
      {score}
      </span>
    <button onClick={() => toggleReplyScore(id, 'dec')}>
      {/* type dec for the decrement btn */}
      <AiOutlineMinus />
    </button>
    </p>
     </div>
 
    {
    ( user.username === state.currentUser.username ) ? <div className='reply_container'>
      <div className='userBtn_container'>
    <button onClick={() => handleReplyDelete(commentId, id)} className='btn_danger'>
     <MdDelete/>
      Delete
    </button>

    <button onClick={() => handleReplyEdit(commentId, id, initializeEdit, setNewContent)} className='btn_primary'>
      <MdOutlineEdit/>
      Edit
    </button>
    </div>
  </div> : <div className='reply_container'>
             <button onClick={() => setShowReply(true)} className='btn_open_reply'>
             <FaReply/><span>Reply</span>
            </button>
           </div>
  }
</section>

     {
       showReply &&  <form onSubmit={handleReplyToReply(commentId, 
       id, 
       newContent, 
       generateNewId, 
       setToDefault, 
       isEditing, 
       editId)}
       className='reply_form'>

     <div className='img-container'>
      <img src={state.currentUser.image.png} width='35' height='35' alt={state.currentUser.username}/>
    </div>

    <div className='textarea_container'>
    <textarea name='reply' value={newContent} onChange={(e) => setNewContent(e.target.value)}>
    </textarea>
    </div>

     <div className='submit_container'>
       <button type='submit'>{isEditing ? 'Update' : 'Reply'}</button>
     </div>
   </form>
     }
    </article>
  )
}

export default Replies;