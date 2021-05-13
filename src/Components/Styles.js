import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Nav = styled.nav`
  padding-left:2rem;
  background-color: #333;
  color: white;
  margin: 0;
  padding: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    border: 1px solid white;
    margin: 5px;
  }

  a: visited {
    color: white;
    text-transform: none;
  }

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: 1fr auto;

  button {
    margin: 0;
    margin-left: 1em;
  }
`

const Summary = styled.article`
  background-color: #333333;
  color: white;

  padding: 1rem;
  margin: 1rem;

  a {
    text-decoration: none;
  }
`

const BlogArticle = styled.article`
  background-color: #333333;
  width: 80%;
  margin: auto;
  padding: 2rem;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 3fr;
  align-items: center;
`

export { Button, Input, Nav, Summary, BlogArticle, Form }
