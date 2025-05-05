
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, you would send this data to your backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      // Store the email in localStorage to simulate authentication
      localStorage.setItem('prCourseUser', JSON.stringify({ email, name }));
      
      setIsLoading(false);
      toast.success("Success! You now have access to all course materials.");
      navigate('/content');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif text-center">Get Course Access</CardTitle>
        <CardDescription className="text-center">
          Enter your email to get immediate access to all PR course materials
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button className="w-full bg-pr-accent hover:bg-pr-accent/90 text-pr-dark" type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Get Instant Access"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-600">
        <p>We respect your privacy. Your email will never be shared.</p>
      </CardFooter>
    </Card>
  );
};

export default EmailSignup;
