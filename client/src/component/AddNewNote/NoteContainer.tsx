import React, { useEffect } from "react";
import NoteNavDiv from "../nav/NoteNav/NoteNavDiv";
import { FaCheckCircle } from "react-icons/fa";
import shortUUID, { uuid } from "short-uuid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { formatDate } from "../../hooks/useFormatDate";
import { addNotes, saveNoteLocally } from "../../features/SliceAddNote";
import axios from "../../api/axios";

type noteType = {
  id: string | undefined;
  title: string | undefined;
  body: string | undefined;
  initialTime: number;
  lastModified: string | undefined;
};
const NoteContainer = () => {
  const [header, setHeader] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [note, setNote] = React.useState<noteType | null>(null);
  const [modifiedTime, setModifiedTime] = React.useState<string>("");
  const loggedUser = useAppSelector((state) => state.userAuth.name);
  const allNotes = useAppSelector((state) => state.getNotes.notes);
  const activeNoteForEdit = useAppSelector(
    (state) => state.getNotes.activeNote
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeNoteForEdit) {
      console.log(activeNoteForEdit);
      setNote({
        id: activeNoteForEdit?.id,
        title: activeNoteForEdit?.title,
        body: activeNoteForEdit?.body,
        initialTime: activeNoteForEdit?.initialTime,
        lastModified: activeNoteForEdit?.lastModified,
      });
    }
  }, [activeNoteForEdit?.title, activeNoteForEdit?.body]);

  const handleNotepost = async () => {
    try {
      let response = await axios.post(
        "/api/v1/note/save",
        JSON.stringify({
          user: loggedUser,
          note: JSON.stringify(allNotes),
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      if (response.status === 201) {
        console.log("note created");
        return response.data;
      } else {
        console.log("something went wrong");
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleSelect(e: React.SyntheticEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.backgroundColor = "white";
  }

  function handleUnSelect(e: React.SyntheticEvent<HTMLTextAreaElement>) {
    const ele = e.currentTarget;
    const eleValue = ele.value;
    if (ele.getAttribute("id") === "heading") {
      setHeader(eleValue);
    } else {
      setContent(eleValue);
    }

    if (eleValue.length > 0) {
      ele.getAttribute("id") === "heading"
        ? (ele.style.backgroundColor = "#9CA3AF")
        : (ele.style.backgroundColor = "#D1D5DB");
    }
    ele.style.height = `${ele.scrollHeight}px`;
    ele.style.overflow = "auto";

    //dispatch the note
    if (note) {
      setModifiedTime(formatDate(note?.initialTime));
    }
    //check if the title or body is not empty
    if (note?.title || note?.body) {
      // console.log(`this is note reqObj from tsx: ${JSON.stringify(note)}`);
      dispatch(
        addNotes({
          user: loggedUser,
          note: [
            {
              n_id: note?.id,
              n_title: note?.title,
              n_body: note?.body,
              n_initialTime: note?.initialTime,
              n_lastModified: note?.lastModified,
            },
          ],
        })
      );
    }
  }

  function updateNote(e: React.SyntheticEvent<HTMLTextAreaElement>) {
    const ele = e.currentTarget;
    const eleValue = ele.value;

    if (note === null) {
      setNote({
        id: shortUUID.uuid(),
        title: ele.getAttribute("id") === "heading" ? eleValue : "",
        body: ele.getAttribute("id") === "content" ? eleValue : "",
        initialTime: Date.now(),
        lastModified: "",
      });
    } else {
      if (ele.getAttribute("id") === "heading") {
        setNote({
          ...note,
          title: eleValue,
          lastModified: modifiedTime,
        });
      } else {
        setNote({
          ...note,
          body: eleValue,
          lastModified: modifiedTime,
        });
      }
    }
  }

  return (
    <>
      <div className="w-full h-screen bg-white relative">
        <div className="w-full">
          <NoteNavDiv />
        </div>
        <div className="relative bg-gray-400 rounded-lg">
          <div className="absolute top-2 right-2 text-3xl text-gray-300">
            <FaCheckCircle />
          </div>
          <div className="p-2 h-screen">
            <div>
              <div className="flex flex-col">
                <textarea
                  id="heading"
                  onSelect={(e) => handleSelect(e)}
                  onBlur={(e) => handleUnSelect(e)}
                  onChange={(e) => updateNote(e)}
                  maxLength={40}
                  cols={10}
                  rows={1}
                  className="p-1 text-2xl font-semibold bg-white rounded-lg w-3/4"
                  value={note?.title}
                ></textarea>
                <span className="text-xs p-2">{note?.lastModified}</span>
              </div>
            </div>
            <div className="p-1 w-full h-96">
              <textarea
                id="content"
                onSelect={(e) => handleSelect(e)}
                onBlur={(e) => handleUnSelect(e)}
                onChange={(e) => updateNote(e)}
                className="p-1 bg-white rounded-lg w-full h-full"
                value={note?.body}
              ></textarea>
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-1 right-1 bg-black text-white px-4 py-2 rounded-md hover:shadow-md hover:bg-gray-700"
          onClick={handleNotepost}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default NoteContainer;
