import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DecisionMaker = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [decisions, setDecisions] = useState([]);
  const [error, setError] = useState('');

  // Load decisions from localStorage on component mount
  useEffect(() => {
    const savedDecisions = localStorage.getItem('decisions');
    if (savedDecisions) {
      setDecisions(JSON.parse(savedDecisions));
    }
  }, []);

  // Save decisions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('decisions', JSON.stringify(decisions));
  }, [decisions]);

  const makeDecision = () => {
    if (!question || !option1 || !option2) {
      setError('Please fill in all fields');
      return;
    }

    const decision = {
      question,
      options: [option1, option2],
      chosen: Math.random() < 0.5 ? option1 : option2,
      timestamp: new Date().toLocaleString()
    };

    setDecisions([decision, ...decisions]);
    setError('');
    
    // Reset fields
    setQuestion('');
    setOption1('');
    setOption2('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decision Maker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Option 1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
            <Input
              placeholder="Option 2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
          </div>
          <Button 
            onClick={makeDecision}
            className="w-full"
          >
            Make a Decision
          </Button>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Decision History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {decisions.map((decision, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium">{decision.question}</p>
                <p className="text-sm text-gray-600">
                  Options: {decision.options.join(' or ')}
                </p>
                <p className="text-green-600 font-medium">
                  Decision: {decision.chosen}
                </p>
                <p className="text-xs text-gray-500">
                  {decision.timestamp}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionMaker;
