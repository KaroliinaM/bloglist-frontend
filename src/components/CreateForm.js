import React from 'react'

const CreateForm=({handleSubmit, handleChange, title, author, url})=>{
  return (
  <div>
    <form onSubmit={handleSubmit}>
      title
      <input
        value={title}
        onChange={handleChange}
        name="title"
      /> <br />
      author
      <input
        value={author}
        onChange={handleChange}
        name="author"
      /> <br />
      url
      <input
        value={url}
        onChange={handleChange}
        name="url"
      /><br />
      <button type="submit">post</button>
    </form>
  </div>
)
}
export default CreateForm
