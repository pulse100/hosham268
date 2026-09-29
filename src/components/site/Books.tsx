import { BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";
import { EmptyState } from "../ui/EmptyState";
import { Stagger, StaggerItem } from "../ui/Reveal";
import { BookCard, FeaturedBook } from "./BookCard";

export function BooksGrid({ books }: { books: Book[] }) {
  if (!books.length) return <EmptyState icon={BookOpen} title="لا توجد ملازم منشورة حالياً" text="ستُضاف الملازم فور صدورها." />;
  if (books.length === 1) return <FeaturedBook book={books[0]} />;
  return (
    <Stagger gap={0.15} className="auto-grid">
      {books.map((b) => (
        <StaggerItem key={b.id}><BookCard book={b} /></StaggerItem>
      ))}
    </Stagger>
  );
}
