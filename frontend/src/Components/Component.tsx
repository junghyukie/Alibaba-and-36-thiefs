"use client";

import { useState } from "react";

// 1. Import tất cả component cần thiết từ shadcn/ui và lucide-react
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Heart, Search, BookOpen } from "lucide-react";
import BookDetailDialog from "./BookDetailDialog";

// Dữ liệu mẫu cho các cuốn sách
const books = [
  { id: "BK001", title: "The Midnight Library", author: "Matt Haig", publisher: "Penguin Random House", status: "New", statusVariant: "default" as const, tags: ["Fiction", "Fantasy"], copies: 12, availableCopies: 8, gradient: "from-purple-400 to-indigo-600", emoji: "📖", rating: 4.5, reviews: 234, description: "A dazzling novel about all the choices that go into a life well lived." },
  { id: "BK002", title: "Project Hail Mary", author: "Andy Weir", publisher: "Ballantine Books", status: "Popular", statusVariant: "secondary" as const, tags: ["Sci-Fi", "Adventure"], copies: 8, availableCopies: 2, gradient: "from-blue-400 to-cyan-600", emoji: "🚀", rating: 4.8, reviews: 456, description: "A lone astronaut must save the earth from disaster." },
  { id: "BK003", title: "Atomic Habits", author: "James Clear", publisher: "Avery Publishing", status: null, tags: ["Self-Help", "Productivity"], copies: 5, availableCopies: 5, gradient: "from-green-400 to-emerald-600", emoji: "💡", rating: 4.7, reviews: 892, description: "An easy way to build good habits and break bad ones." },
];

// Danh sách các thể loại
const categories = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Biography", "Horror", "Historical"];

export default function Component() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div id="webcrumbs" className="bg-muted/40 min-h-screen">
      <header className="bg-background shadow-sm sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">
                Alibaba and 36 Thiefs
              </h1>
            </div>

            <div className="relative flex-1 max-w-sm hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books, authors..."
                className="pl-8 w-full"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarFallback>GU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Library Collection
            </h2>
            <p className="text-muted-foreground mt-1">
              Browse our extensive collection of books
            </p>
          </div>

            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent 
                className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md"
                position="popper"
              >
                <SelectItem value="all" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  All Categories
                </SelectItem>
                <SelectItem value="fiction" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Fiction
                </SelectItem>
                <SelectItem value="fantasy" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Fantasy
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent 
                className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md"
                position="popper"
              >
                <SelectItem value="newest" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Newest First
                </SelectItem>
                <SelectItem value="oldest" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Oldest First
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="flex flex-wrap gap-x-4 gap-y-2 mb-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="r-all" />
            <Label htmlFor="r-all">All Books</Label>
          </div>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category.toLowerCase()} id={`r-${category.toLowerCase()}`} />
              <Label htmlFor={`r-${category.toLowerCase()}`}>{category}</Label>
            </div>
          ))}
        </RadioGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`relative h-48 bg-gradient-to-br ${book.gradient} flex items-center justify-center`}>
                <span className="text-6xl">{book.emoji}</span>
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{book.title}</CardTitle>
                  {book.status && <Badge variant={book.statusVariant}>{book.status}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground pt-1 !mt-0">by {book.author}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{book.copies}</span> copies available
                </div>
                <Button size="sm" onClick={() => { setSelectedBook(book); setIsDialogOpen(true); }}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <BookDetailDialog 
        book={selectedBook} 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  );
}