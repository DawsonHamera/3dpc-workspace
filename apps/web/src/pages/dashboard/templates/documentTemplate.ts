import type { JSONContent } from "@tiptap/react";

export const documentTemplate: JSONContent = {
    type: "doc",
    content: [
        {
            type: "heading",
            attrs: {
                level: 1,
            },
            content: [
                {
                    type: "text",
                    text: "Project Documentation",
                },
            ],
        },

        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Describe the purpose of this project, its goals, and the current state of development.",
                },
            ],
        },

        {
            type: "heading",
            attrs: {
                level: 2,
            },
            content: [
                {
                    type: "text",
                    text: "Overview",
                },
            ],
        },

        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "This section provides a general overview of the project and its intended use.",
                },
            ],
        },

        {
            type: "heading",
            attrs: {
                level: 2,
            },
            content: [
                {
                    type: "text",
                    text: "Objectives",
                },
            ],
        },

        {
            type: "bulletList",
            content: [
                {
                    type: "listItem",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Primary project goal",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "listItem",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Expected outcomes",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "listItem",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: "Important constraints",
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            type: "heading",
            attrs: {
                level: 2,
            },
            content: [
                {
                    type: "text",
                    text: "Project Files",
                },
            ],
        },

        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Attached project resources will appear here.",
                },
            ],
        },

        // Future custom Tiptap node
        // {
        //     type: "fileEmbed",
        //     attrs: {
        //         fileId: "your-file-id",
        //     },
        // },

        {
            type: "heading",
            attrs: {
                level: 2,
            },
            content: [
                {
                    type: "text",
                    text: "Development Notes",
                },
            ],
        },

        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Record important decisions, changes, experiments, and future ideas here.",
                },
            ],
        },

        {
            type: "heading",
            attrs: {
                level: 2,
            },
            content: [
                {
                    type: "text",
                    text: "Change Log",
                },
            ],
        },

        {
            type: "table",
            content: [
                {
                    type: "tableRow",
                    content: [
                        {
                            type: "tableHeader",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "text",
                                            text: "Date",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "tableHeader",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "text",
                                            text: "Change",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },

                {
                    type: "tableRow",
                    content: [
                        {
                            type: "tableCell",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "text",
                                            text: "2026-07-22",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "tableCell",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "text",
                                            text: "Initial document created",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};