'use client';

import { useState } from 'react';
import { Search, Filter, Star, Download, Zap, Brain, Workflow, Database, Code, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categories = [
  { id: 'all', label: 'All Categories', icon: Zap },
  { id: 'productivity', label: 'Productivity', icon: Brain },
  { id: 'automation', label: 'Automation', icon: Workflow },
  { id: 'data', label: 'Data Analysis', icon: Database },
  { id: 'development', label: 'Development', icon: Code },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
];

const featuredAgents = [
  {
    id: 1,
    name: 'Smart Assistant Pro',
    description: 'Advanced AI assistant for complex task automation and decision making',
    category: 'productivity',
    rating: 4.8,
    downloads: 12500,
    price: 'Free',
    tags: ['Popular', 'Trending'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    name: 'Data Analyzer',
    description: 'Powerful data analysis and visualization agent with ML capabilities',
    category: 'data',
    rating: 4.9,
    downloads: 8300,
    price: '$29/mo',
    tags: ['Premium', 'New'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    name: 'Code Generator',
    description: 'AI-powered code generation and optimization for multiple languages',
    category: 'development',
    rating: 4.7,
    downloads: 15200,
    price: 'Free',
    tags: ['Open Source'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 4,
    name: 'Workflow Optimizer',
    description: 'Intelligent workflow automation and process optimization agent',
    category: 'automation',
    rating: 4.6,
    downloads: 6700,
    price: '$19/mo',
    tags: ['Business'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 5,
    name: 'Chat Moderator',
    description: 'Advanced moderation and community management assistant',
    category: 'communication',
    rating: 4.5,
    downloads: 9100,
    price: '$15/mo',
    tags: ['Community'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 6,
    name: 'Research Assistant',
    description: 'Comprehensive research and information gathering agent',
    category: 'productivity',
    rating: 4.8,
    downloads: 11300,
    price: 'Free',
    tags: ['Academic'],
    image: '/api/placeholder/300/200'
  }
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredAgents = featuredAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'newest':
        return b.id - a.id;
      default:
        return b.downloads - a.downloads;
    }
  });

  return (
    <div className="container mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Agent Marketplace
            </h1>
            <p className="text-muted-foreground">
              Discover and deploy powerful AI agents for your workflows
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center space-x-1 text-xs"
              >
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Agents Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedAgents.map((agent) => (
              <Card key={agent.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-muted/50">
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {agent.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Download className="h-3 w-3" />
                          <span className="text-xs">{agent.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={agent.price === 'Free' ? 'secondary' : 'default'}>
                      {agent.price}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {agent.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {agent.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1" size="sm">
                      Install
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedAgents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">No agents found</h3>
                <p className="text-sm">Try adjusting your search or category filters</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
