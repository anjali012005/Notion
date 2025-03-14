"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "./actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";




const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isPending, startTransition] = useTransition();
    const [summary, setSummary] = useState("");
    const [question, setQuestion] = useState("");

    const handleAskQuestion = async (e: FormEvent) => {
        try {
            e.preventDefault();

        setQuestion(input);

        startTransition(async ()=>{
            const documentData = doc.get("document-store").toJSON();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        question: input,
                    })
                }
            )

            if(res.ok){
                console.log(res);
                const {message} = await res.json();

                setInput("");
                setSummary(message);

                toast.success("Question asked successfully!")
            }
        })
        } catch (error) {
            console.log(error);
        }

    }


    // const handleAskQuestion = async (e: FormEvent) => {
    //     e.preventDefault();
    
    //     setQuestion(input);
    
    //     startTransition(async () => {
    //         const documentStore = doc.get("document-store");
    //         if (!documentStore) {
    //             toast.error("Document data not found!");
    //             return;
    //         }
            
    //         const documentData = documentStore.toJSON();
    //         const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
            
    //         if (!BASE_URL) {
    //             console.error("Base URL is not defined!");
    //             toast.error("Server configuration error. Please check.");
    //             return;
    //         }
    
    //         try {
    //             const res = await fetch(`${BASE_URL}/chatToDocument`, {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ documentData, question: input }),
    //             });
    
    //             if (!res.ok) {
    //                 throw new Error(`Server error: ${res.status} ${res.statusText}`);
    //             }
    
    //             const { message } = await res.json();
    
    //             setInput("");
    //             setSummary(message);
    //             toast.success("Question asked successfully!");
    //         } catch (error) {
    //             console.error("Error asking question:", error);
    //             toast.error("Failed to ask the question. Try again.");
    //         }
    //     });
    // };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>
                    <MessageCircleCode className="mr-2" />
                    Chat to Document
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat to the Document!</DialogTitle>
                    <DialogDescription>
                        Ask a question and chat to the document with AI.
                    </DialogDescription>
                </DialogHeader>

                {summary &&
                    <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                        <div className="flex">
                            <BotIcon className="w-10 flex-shrink-0" />
                            <p className="font-bold">
                                GPT {isPending ? "is thinking..." : "Says"}
                            </p>
                        </div>
                        <p>
                            {isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}
                        </p>
                    </div>
                }

                <form className="flex gap-2" onSubmit={handleAskQuestion}>
                    <Input
                        type="text"
                        placeholder="i.e. what is this about?"
                        className="w-full"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" disabled={!input || isPending}>
                        {isPending ? "Asking..." : "Ask"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default ChatToDocument
