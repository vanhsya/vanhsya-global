'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Calendar, Bell, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Task {
  id: string;
  title: string;
  description: string;
  category: 'document' | 'application' | 'test' | 'appointment' | 'payment' | 'other';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  notes?: string;
}

interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  country: string;
  visaType: string;
  tasks: Omit<Task, 'id' | 'completed'>[];
}

const checklistTemplates: ChecklistTemplate[] = [
  {
    id: 'canada-express-entry',
    name: 'Canada Express Entry',
    description: 'Complete checklist for Canadian permanent residence through Express Entry',
    country: 'Canada',
    visaType: 'Permanent Residence',
    tasks: [
      {
        title: 'Take Language Test',
        description: 'Complete IELTS, CELPIP, or TEF test',
        category: 'test',
        priority: 'high',
        dueDate: '2024-03-01'
      },
      {
        title: 'Get Educational Credential Assessment',
        description: 'Obtain ECA from designated organization',
        category: 'document',
        priority: 'high',
        dueDate: '2024-03-15'
      },
      {
        title: 'Create Express Entry Profile',
        description: 'Submit profile to IRCC online system',
        category: 'application',
        priority: 'medium',
        dueDate: '2024-04-01'
      },
      {
        title: 'Gather Reference Letters',
        description: 'Collect employment reference letters',
        category: 'document',
        priority: 'medium',
        dueDate: '2024-03-20'
      },
      {
        title: 'Police Clearance Certificate',
        description: 'Obtain police clearance from all countries',
        category: 'document',
        priority: 'high',
        dueDate: '2024-04-15'
      },
      {
        title: 'Medical Examination',
        description: 'Complete medical exam with approved physician',
        category: 'appointment',
        priority: 'high',
        dueDate: '2024-05-01'
      }
    ]
  },
  {
    id: 'australia-skilled',
    name: 'Australia Skilled Migration',
    description: 'Checklist for Australian skilled worker visa (subclass 189/190)',
    country: 'Australia',
    visaType: 'Skilled Worker',
    tasks: [
      {
        title: 'Skills Assessment',
        description: 'Complete skills assessment with relevant authority',
        category: 'test',
        priority: 'high',
        dueDate: '2024-03-01'
      },
      {
        title: 'English Language Test',
        description: 'Take IELTS, PTE, or TOEFL iBT',
        category: 'test',
        priority: 'high',
        dueDate: '2024-02-15'
      },
      {
        title: 'Submit EOI',
        description: 'Expression of Interest through SkillSelect',
        category: 'application',
        priority: 'medium',
        dueDate: '2024-03-30'
      },
      {
        title: 'Health Examinations',
        description: 'Complete health checks with approved physician',
        category: 'appointment',
        priority: 'high',
        dueDate: '2024-04-30'
      },
      {
        title: 'Character Documents',
        description: 'Police clearances from all countries',
        category: 'document',
        priority: 'high',
        dueDate: '2024-04-15'
      }
    ]
  }
];

export default function ChecklistAssistant() {
  const [selectedTemplate, setSelectedTemplate] = useState<ChecklistTemplate | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'other' as Task['category'],
    priority: 'medium' as Task['priority'],
    dueDate: ''
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const loadTemplate = (template: ChecklistTemplate) => {
    setSelectedTemplate(template);
    const templateTasks: Task[] = template.tasks.map((task, index) => ({
      ...task,
      id: `task-${index}`,
      completed: false
    }));
    setTasks(templateTasks);
  };

  const addCustomTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: `custom-${Date.now()}`,
      ...newTask,
      completed: false
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      category: 'other',
      priority: 'medium',
      dueDate: ''
    });
    setShowAddTask(false);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getProgress = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return (completed / tasks.length) * 100;
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'document': return '📄';
      case 'application': return '📝';
      case 'test': return '📊';
      case 'appointment': return '📅';
      case 'payment': return '💳';
      default: return '✅';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <section className="section-padding pt-32 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckSquare className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="heading-xl text-gray-800 mb-6">
                AI Checklist <span className="text-gradient-cyan">Assistant</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay organized throughout your immigration journey with personalized checklists, 
                deadlines, and smart reminders powered by AI.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {checklistTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="modern-card group cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => loadTemplate(template)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
                        <p className="text-gray-600 mb-3">{template.description}</p>
                      </div>
                      <div className="text-2xl">🇨🇦</div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{template.country}</span>
                      <span>{template.visaType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{template.tasks.length} tasks</span>
                      <div className="flex items-center text-purple-600 font-semibold">
                        Start Checklist
                        <CheckSquare className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="modern-card p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Use Our Checklist Assistant?</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Smart Organization</h3>
                  <p className="text-gray-600 text-sm">AI-powered task prioritization and deadline management</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Smart Reminders</h3>
                  <p className="text-gray-600 text-sm">Never miss important deadlines with intelligent notifications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Timeline Management</h3>
                  <p className="text-gray-600 text-sm">Optimized schedules based on processing times and requirements</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  const progress = getProgress();
  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding pt-32 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <button
              onClick={() => {
                setSelectedTemplate(null);
                setTasks([]);
              }}
              className="btn-secondary mb-6"
            >
              ← Back to Templates
            </button>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedTemplate.name}</h1>
                <p className="text-gray-600">{selectedTemplate.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600 mb-1">{Math.round(progress)}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{tasks.filter(t => t.completed).length} of {tasks.length} tasks completed</span>
              <span>•</span>
              <span>{tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length} overdue</span>
              <span>•</span>
              <span>{tasks.filter(t => !t.completed && !isOverdue(t.dueDate)).length} pending</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Filters and Add Task */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {[
                    { id: 'all', label: 'All Tasks' },
                    { id: 'pending', label: 'Pending' },
                    { id: 'completed', label: 'Completed' }
                  ].map(filterOption => (
                    <button
                      key={filterOption.id}
                      onClick={() => setFilter(filterOption.id as 'all' | 'pending' | 'completed')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filter === filterOption.id
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filterOption.label}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowAddTask(true)}
                  className="btn-primary text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Task
                </button>
              </div>

              {/* Add Task Form */}
              {showAddTask && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="modern-card p-6 mb-6"
                >
                  <h3 className="font-bold text-gray-800 mb-4">Add Custom Task</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter task title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={2}
                        placeholder="Task description..."
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={newTask.category}
                          onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value as Task['category'] }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          aria-label="Select task category"
                        >
                          <option value="document">Document</option>
                          <option value="application">Application</option>
                          <option value="test">Test</option>
                          <option value="appointment">Appointment</option>
                          <option value="payment">Payment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                          value={newTask.priority}
                          onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          aria-label="Select task priority"
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                        <input
                          type="date"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          aria-label="Select due date"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={addCustomTask} className="btn-primary text-sm">
                        Add Task
                      </button>
                      <button 
                        onClick={() => setShowAddTask(false)}
                        className="btn-secondary text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tasks List */}
              <div className="space-y-4">
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`modern-card p-4 transition-all duration-300 ${
                      task.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 border-2 rounded-full flex items-center justify-center mt-1 transition-all ${
                          task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{getCategoryIcon(task.category)}</span>
                            <h3 className={`font-semibold ${
                              task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                            }`}>
                              {task.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.dueDate && (
                              <div className={`flex items-center text-sm ${
                                isOverdue(task.dueDate) && !task.completed ? 'text-red-600' : 'text-gray-500'
                              }`}>
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(task.dueDate).toLocaleDateString()}
                                {isOverdue(task.dueDate) && !task.completed && (
                                  <AlertCircle className="w-4 h-4 ml-1 text-red-500" />
                                )}
                              </div>
                            )}
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Delete task"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {task.description && (
                          <p className={`text-sm ${
                            task.completed ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks found</h3>
                  <p className="text-gray-500">
                    {filter === 'completed' ? 'No completed tasks yet' :
                     filter === 'pending' ? 'All tasks completed!' :
                     'Add your first task to get started'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Progress Overview</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{Math.round(progress)}%</div>
                    <div className="text-sm text-gray-500">Overall Progress</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold text-green-600">{tasks.filter(t => t.completed).length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-semibold text-blue-600">{tasks.filter(t => !t.completed).length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Overdue:</span>
                      <span className="font-semibold text-red-600">
                        {tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm">
                    Download PDF Report
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    Share Checklist
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    Set Reminders
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="modern-card p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {tasks
                    .filter(task => !task.completed && task.dueDate)
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .slice(0, 3)
                    .map(task => (
                      <div key={task.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <span className="text-lg">{getCategoryIcon(task.category)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{task.title}</p>
                          <p className={`text-xs ${
                            isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  {tasks.filter(task => !task.completed && task.dueDate).length === 0 && (
                    <p className="text-sm text-gray-500">No upcoming deadlines</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
