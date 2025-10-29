import { supabase } from '../supabaseClient';

export const fetchSubjects = async () => {
    const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching subjects:', error.message);
        return [];
    }

    return data;
};

export const fetchNotesBySubject = async (subjectId) => {
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('subject_id', subjectId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching notes:', error.message);
        return [];
    }

    return data;
};

export const addSubject = async (subjectData) => {
    const { data, error } = await supabase
        .from('subjects')
        .insert([subjectData])
        .select()
        .single();

    if (error) {
        console.error('Error adding subject:', error.message);
        return null;
    }

    return data;
};

export const uploadNotes = async (notesArray) => {
    const { error } = await supabase
        .from('notes')
        .insert(notesArray);

    if (error) {
        console.error('Error uploading notes:', error.message);
        return false;
    }

    return true;
};