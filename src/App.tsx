import { useState } from 'react'

function App() {
  const [folder, setFolder] = useState<FileSystemDirectoryHandle | null>(null)
  const [files, setFiles] = useState<FileSystemFileHandle[]>([])

  async function pickFolder() {
    const handle = await window.showDirectoryPicker()
    setFolder(handle)

    const csvFiles: FileSystemFileHandle[] = []

    for await (const entry of handle.values()) {
      if (entry.kind === 'file' && entry.name.endsWith('.csv')) {
        csvFiles.push(entry)
      }
    }

    setFiles(csvFiles)

    if (csvFiles.length === 0) return;
    const first = csvFiles[0]
    const file = await first.getFile()
    const text = await file.text()
    console.log(text)
    
  }

  return (
    <>
      <h1>aimJS</h1>
      <button onClick={pickFolder}>Select stats folder</button>
      <p>{folder ? folder.name : 'No folder selected'}</p>
      <p>{files.map((file) => file.name).join(', ')}</p>
    </>
  )
}

export default App
