import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Flows from './pages/Flows';
import Designer from './pages/Designer';
import Executions from './pages/Executions';
import Credentials from './pages/Credentials';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Monorepo Shell Routes */}
        <Route path="/" element={<AppLayout />}>
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="flows" element={<Flows />} />
          <Route path="flows/:id" element={<Designer />} />
          <Route path="executions" element={<Executions />} />
          <Route path="credentials" element={<Credentials />} />
        </Route>
        
        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
