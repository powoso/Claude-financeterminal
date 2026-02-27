import { useState } from 'react';
import { useTerminalStore } from '../store';
import { FileDown } from 'lucide-react';

export function PdfExport() {
  const { activeTicker } = useTerminalStore();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const root = document.getElementById('root');
      if (!root) return;

      const canvas = await html2canvas(root, {
        backgroundColor: '#0a0e17',
        scale: 1.5,
        logging: false,
        useCORS: true,
      });

      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('l', 'mm', 'a4');

      let position = 0;
      const pageHeight = 210; // A4 landscape height

      while (position < imgHeight) {
        if (position > 0) pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          -position,
          imgWidth,
          imgHeight
        );
        position += pageHeight;
      }

      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`${activeTicker}_analysis_${timestamp}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-terminal-panel border border-terminal-border hover:border-terminal-accent text-terminal-muted hover:text-terminal-accent transition-all disabled:opacity-50"
    >
      <FileDown className="w-3.5 h-3.5" />
      {exporting ? 'Exporting...' : 'Export PDF'}
    </button>
  );
}
