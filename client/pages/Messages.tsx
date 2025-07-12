"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft } from "lucide-react"
import Layout from "../components/Layout"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  isRead: boolean
}

interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    avatar?: string
    status: "online" | "away" | "offline"
    skills: string[]
  }[]
  lastMessage: Message
  unreadCount: number
  skillContext: {
    offering: string
    seeking: string
  }
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    participants: [
      {
        id: "user1",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        skills: ["Python", "Machine Learning"],
      },
      {
        id: "user2",
        name: "Alex Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        skills: ["UI/UX Design", "Figma"],
      },
    ],
    lastMessage: {
      id: "msg1",
      senderId: "user1",
      content: "That sounds great! When would you like to start the Python lessons?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
    },
    unreadCount: 2,
    skillContext: {
      offering: "Python",
      seeking: "Design",
    },
  },
  {
    id: "2",
    participants: [
      {
        id: "user3",
        name: "Marcus Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
        skills: ["Guitar", "Music Theory"],
      },
    ],
    lastMessage: {
      id: "msg2",
      senderId: "user3",
      content: "I can teach you some basic chords this weekend",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    skillContext: {
      offering: "Guitar",
      seeking: "Photography",
    },
  },
  {
    id: "3",
    participants: [
      {
        id: "user4",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        skills: ["Spanish", "Language Exchange"],
      },
    ],
    lastMessage: {
      id: "msg3",
      senderId: "user4",
      content: "¡Hola! Ready for our Spanish conversation practice?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 0,
    skillContext: {
      offering: "Spanish",
      seeking: "English",
    },
  },
  {
    id: "4",
    participants: [
      {
        id: "user5",
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        skills: ["React", "Frontend Development"],
      },
    ],
    lastMessage: {
      id: "msg4",
      senderId: "user5",
      content: "I found some great React resources to share with you",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isRead: true,
    },
    unreadCount: 1,
    skillContext: {
      offering: "React",
      seeking: "Backend",
    },
  },
]

const mockMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1",
      senderId: "user2",
      content:
        "Hi Sarah! I saw your profile and I'm really interested in learning Python. I can help you with UI/UX design in return.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "2",
      senderId: "user1",
      content:
        "Hi Alex! That sounds perfect. I've been wanting to improve my design skills. What's your experience level with programming?",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      isRead: true,
    },
    {
      id: "3",
      senderId: "user2",
      content:
        "I'm a complete beginner with Python, but I'm eager to learn. I have 5 years of experience in UI/UX design and I'm proficient in Figma, Sketch, and Adobe XD.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "4",
      senderId: "user1",
      content:
        "Perfect! I can start with Python basics and we can work our way up. In return, I'd love to learn about user research and design thinking.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true,
    },
    {
      id: "5",
      senderId: "user1",
      content: "That sounds great! When would you like to start the Python lessons?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "user3",
      content:
        "Hey! I saw you're interested in learning guitar. I've been playing for 10 years and would love to teach you in exchange for photography lessons.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "2",
      senderId: "user3",
      content: "I can teach you some basic chords this weekend",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
    },
  ],
}

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const [showConversationList, setShowConversationList] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentConversation = mockConversations.find((c) => c.id === selectedConversation)
  const currentMessages = selectedConversation ? mockMessages[selectedConversation] || [] : []

  const filteredConversations = mockConversations.filter((conversation) =>
    conversation.participants.some(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
    ),
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setShowConversationList(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60)
      return `${minutes}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      const days = Math.floor(diffInHours / 24)
      return `${days}d ago`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const selectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId)
    if (isMobileView) {
      setShowConversationList(false)
    }
  }

  const goBackToList = () => {
    setShowConversationList(true)
    if (isMobileView) {
      setSelectedConversation(null)
    }
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] bg-background">
        {/* Conversations Sidebar */}
        <div
          className={`${
            isMobileView ? (showConversationList ? "w-full" : "hidden") : "w-80"
          } border-r border-border flex flex-col bg-card`}
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-semibold mb-3">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation) => {
                const otherParticipant =
                  conversation.participants.find((p) => p.id !== "currentUser") || conversation.participants[0]
                const isSelected = selectedConversation === conversation.id

                return (
                  <Card
                    key={conversation.id}
                    className={`mb-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected ? "ring-2 ring-skill-primary bg-skill-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => selectConversation(conversation.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-skill-primary/10 text-skill-primary font-medium">
                              {otherParticipant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(otherParticipant.status)}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-sm truncate">{otherParticipant.name}</h3>
                            <div className="flex items-center space-x-2">
                              {conversation.unreadCount > 0 && (
                                <Badge variant="default" className="bg-skill-primary text-xs px-2 py-0.5">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatTime(conversation.lastMessage.timestamp)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {conversation.skillContext.offering} ↔ {conversation.skillContext.seeking}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className={`${isMobileView ? (showConversationList ? "hidden" : "w-full") : "flex-1"} flex flex-col`}>
          {selectedConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isMobileView && (
                      <Button variant="ghost" size="sm" onClick={goBackToList} className="mr-2">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}

                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentConversation.participants[0].avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-skill-primary/10 text-skill-primary">
                          {currentConversation.participants[0].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(currentConversation.participants[0].status)}`}
                      />
                    </div>

                    <div>
                      <h2 className="font-semibold">{currentConversation.participants[0].name}</h2>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {currentConversation.skillContext.offering} ↔ {currentConversation.skillContext.seeking}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize">
                          {currentConversation.participants[0].status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => {
                    const isCurrentUser = message.senderId === "user1" // Mock current user

                    return (
                      <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] ${isCurrentUser ? "order-2" : "order-1"}`}>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isCurrentUser
                                ? "bg-skill-primary text-white rounded-br-md"
                                : "bg-muted text-foreground rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p
                            className={`text-xs text-muted-foreground mt-1 ${
                              isCurrentUser ? "text-right" : "text-left"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-end space-x-2">
                  <Button variant="ghost" size="sm" className="mb-2">
                    <Paperclip className="h-4 w-4" />
                  </Button>

                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20 min-h-[40px] resize-none"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-skill-primary hover:bg-skill-primary/90 mb-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-skill-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-skill-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
