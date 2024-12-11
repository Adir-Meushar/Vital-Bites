import './centeredLayout.css'
function CenteredLayout({children}) {
    return (
        <div className="centered-container">
          {children}
        </div>
      );
}

export default CenteredLayout
