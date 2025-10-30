import { supabase } from "../supabaseClient";

export const fetchSubjects = async () => {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching subjects:", error.message);
    return [];
  }

  return data;
};

export const fetchNotesBySubject = async (subjectId) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error.message);
    return [];
  }

  return data;
};

export const addSubject = async (subjectData) => {
  const { data, error } = await supabase
    .from("subjects")
    .insert([subjectData])
    .select()
    .single();

  if (error) {
    console.error("Error adding subject:", error.message);
    return null;
  }

  return data;
};

export const uploadNotes = async (notesArray) => {
  const { error } = await supabase.from("notes").insert(notesArray);

  if (error) {
    console.error("Error uploading notes:", error.message);
    return false;
  }

  return true;
};

export const deleteSubject = async (subjectId) => {
  try {
    // 1️⃣ Fetch all notes related to this subject
    const { data: notes, error: notesError } = await supabase
      .from("notes")
      .select("file_url")
      .eq("subject_id", subjectId);

    if (notesError) throw notesError;

    // 2️⃣ Delete files from storage
    if (notes && notes.length > 0) {
      const filePaths = notes.map(
        (note) => note.file_url.split("/storage/v1/object/public/notes/")[1]
      );

      const { error: storageError } = await supabase.storage
        .from("notes")
        .remove(filePaths);

      if (storageError)
        console.error("Storage delete error:", storageError.message);
    }

    // 3️⃣ Delete all notes belonging to that subject
    const { error: notesDeleteError } = await supabase
      .from("notes")
      .delete()
      .eq("subject_id", subjectId);

    if (notesDeleteError) throw notesDeleteError;

    // 4️⃣ Delete the subject itself
    const { error: subjectDeleteError } = await supabase
      .from("subjects")
      .delete()
      .eq("id", subjectId);

    if (subjectDeleteError) throw subjectDeleteError;

    return true;
  } catch (error) {
    console.error("Error deleting subject:", error.message);
    return false;
  }
};
