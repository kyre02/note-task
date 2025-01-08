import { Pin , Pencil, Trash2 } from "lucide-react";
import moment from "moment"


const NoteCard = ({note, onEdit, onDelete, onPinNote}) => {

  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out
     dark:bg-slate-700/40 text-text dark:border-slate-700/40 dark:hover:shadow-slate-800 dark:shadow-lg">
        <div className="flex items-center justify-between">
            <div>
                <h6 className='text-xl font-semibold text-slate-500 dark:text-text'>{note.title}</h6>
                <span className='text-xs text-slate-500 dark:text-text'>{moment(note.date).format("Do MMM YYYY")}</span>
            </div>
            <Pin 
                onClick={onPinNote} 
                className={`${note.isPinned ? 'text-blue-500' : 'text-slate-400'} hover:text-blue-500 cursor-pointer` }
            />
        </div>
        <p className=" text-slate-500 mt-2 dark:text-text">{note.content?.slice(0,60) || 'No content available'}</p>
        <div className="flex items-center justify-between mt-2 dark:text-text">
            <div className="text-xs text-slate-500 dark:text-text">{note.tags.map((item) => `#${item} ` )}</div>
                <div className="flex items-center gap-2">
                    <Pencil 
                        className="hover:text-blue-600 cursor-pointer"
                        onClick={onEdit}
                    />
                    <Trash2 
                        className="hover:text-red-500 cursor-pointer"
                        onClick={onDelete}
                    />
                </div>
            
            
        </div>
    </div>
  )
}

export default NoteCard