import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import BookList from './pages/BookList';
import Checkout from './pages/Checkout';
import BookDetails from './pages/BookDetails';
import Contact from './pages/Contact';
import { BookListProvider } from './contexts/BookListContext';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

function App() {

  return (
 <ThemeProvider theme={theme}>
  <BookListProvider>
    <Router>
        <div className = "app-container">
          <Header />
            <main className = "main-content">
              <Routes>
                <Route path = "/" element = {<Home />}/>
                <Route path = "/book/:id" element = {<BookDetails />}/>
                <Route path = "/booklist" element = {<BookList />}/>
                <Route path = "/checkout" element = {<Checkout />}/>
                <Route path = "/contact" element = {<Contact />}/>
              </Routes>
          </main>
         <ToastContainer position="top-right" autoClose={2000} /> 
        </div>
    </Router>
  </BookListProvider>
</ThemeProvider>
  )
}

export default App
