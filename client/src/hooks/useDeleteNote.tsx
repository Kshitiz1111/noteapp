import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import axios from "../api/axios";

const useDeleteNote = () => {
  const loggedUser = useAppSelector((state) => state.userAuth.name);
  const allNotes = useAppSelector((state) => state.getNotes.notes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteNoteOnServer = async (count: number) => {
    setIsLoading(true);
    setError(false); // Clear any previous errors
    console.log(`delete hooks: ${JSON.stringify(allNotes)}`);
    console.log(count);
    if (count > 1) {
      console.log("lunch");
      try {
        const response = await axios.post(
          `/api/v1/note/del`,
          JSON.stringify({
            user: loggedUser,
            note: JSON.stringify(allNotes),
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { deleteNoteOnServer, isLoading, error };
};

export default useDeleteNote;
