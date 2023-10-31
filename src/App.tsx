import {Box, Container} from "@mui/material";
import RichTextEditor from "./components/RichTextEditor.tsx";

function App() {


  return (
      <Container maxWidth="lg" sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '100vh'
      }}>
          {/*Editor container ie: some external component that would contain the editor*/}
          <Box sx={{
              border: `1px solid #2F323720`,
                borderRadius: '4px',
              width: '100%',
          }}>
              <RichTextEditor />
          </Box>
      </Container>
  )
}

export default App
