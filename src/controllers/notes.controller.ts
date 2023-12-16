import { Request,Response } from "express";

export const notesController = {
    getAllNotes: (req: Request, res: Response) => {
        // Simulate fetching notes from a database
        const notes = [
            { id: 1, title: 'Note 1', content: 'Content of Note 1' },
            { id: 2, title: 'Note 2', content: 'Content of Note 2' },
            // Add more notes as needed
        ];

        res.render('notes', { title: 'Notes',notes });
    },
    createNote: (req: Request, res: Response) => {
        // Simulate creating a new note
        const { title, content } = req.body;
        const newNote = { id: Date.now(), title, content };

        // Add logic to save the new note to a database (simulated here)
        console.log('New Note:', newNote);

        // Redirect to the list of notes after creating a new note
        res.redirect('/notes');
    },
};
