
const createNote = () =>{
    const title = document.getElementById('create-note-title').value;
    const desc = document.getElementById('create-note-desc').value;
    const id = Math.floor(Math.random()*100000000) + '';
    
    const note = { id, title, desc};
  let notes = [];
  if (localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));

  title.value='';
  desc.value='';
  fetchNotes();
}


const deleteNotes = id => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const remainingnotes = notes.filter(notes_id=> notes_id.id !== id);

    // console.log(remainingnotes)

    localStorage.setItem('notes', JSON.stringify(remainingnotes));
    fetchNotes();
  }

const editModal = id =>{

    const notes = JSON.parse(localStorage.getItem('notes'));
    const remainingnotes = notes.filter(notes_id=> notes_id.id === id);

    // console.log(remainingnotes);
    // console.log(remainingnotes[0].title)

    const{ title, desc} = remainingnotes[0];

    document.getElementById('edit-modal').innerHTML = `
    <!-- Put this part before <body> tag MODAL Edit notes-->

    <input type="checkbox" id="my-edit-modal" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">

        <input id="edit-note-title" type="text" class="font-bold text-lg bg-transparent p-2 w-full" value='${title}' placeholder="Edit">
        <textarea id="edit-note-desc" placeholder="Edit your note" class="py-4 px-2 bg-transparent resize-none w-full" name="" id="" cols="30" rows="10">${desc}</textarea>

        <div class="modal-action">
        <label for="my-edit-modal" onclick="editNote('${id}')" class="btn">Save</label>
        </div>
    </div>
    </div>
    `;
}

const editNote = id =>{

  const editTitle = document.getElementById('edit-note-title').value;
  const editDesc = document.getElementById('edit-note-desc').value;

    const notes = JSON.parse(localStorage.getItem('notes'));
    
    // console.log(id, editTitle, editDesc)
    const currentNote = notes.find(note => note.id === id);

    currentNote.title = editTitle;
    currentNote.desc = editDesc;
    
    // console.log(notes);
 
    localStorage.setItem('notes', JSON.stringify(notes));
    fetchNotes();
}






const fetchNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
  
    // console.log(notes)

    for (var i = 0; i < notes.length; i++) {
      const{ id, title, desc} = notes[i];
  
      notesList.innerHTML +=   ` <div class="bg-slate-300 md:p-5 p-2">
                                    <div class="flex justify-between p-2 text-black">
                                        <h4 title='${title}' class="text-lg font-bold inline"> ${title.length>20?title.slice(0,20)+'...': title } </h4>
                                        <div class="text-xl px-1">
                                            <label for="my-edit-modal" onclick="editModal('${id}')" title="Edit" class="text-green-700 cursor-pointer"><i class="fa-regular fa-pen-to-square"></i></label>
                                            <button onclick="deleteNotes('${id}')" title="Delete" class="text-red-700"><i class="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                    <p title='${desc}' class="w-full resize-none p-2 bg-transparent text-black max-h-96 overflow-hidden" >
                                    ${desc.length>800?desc.slice(0,820)+'...': desc }
                                    </p>
                                </div>
                                
                               
                                `;
    }
  };

  fetchNotes();