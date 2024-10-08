import { useState } from "react";

function Modal({mode, setShowModal, task}) {
    //const mode = 'create';
    const editMode = mode === 'edit' ? true : false;
    
    const [data, setData] = useState({
      user_email:editMode ? task.user_email : 'daniel@lozano.cc',
      title: editMode ? task.title : null,
      progress: editMode ? task.progress : 50,
      date: editMode ? "" : new Date()
    });
    
    const postData = async (e) => {
      e.preventDefault();
      try {
        const response = fetch('http://localhost:8000/todos/', {
          method:"POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const handleChange = (e) =>{
      console.log('changing');
      const {name, value} =  e.target;
      setData(data => ({
        ...data, 
        [name] : value
      }));

    }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} your task</h3>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>
          <form>
            <input
              required
              maxLength={30}
              placeholder="Your task here"
              name="title"
              onChange={handleChange}
              value={data.title}
            />
            <br />
            <label for="range">Drag to select your current progress</label>
            <input
              required
              id="range"
              type="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}


            />
            <button className="edit" type="submit" onClick={editMode ? '' : postData} >Submit</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Modal;