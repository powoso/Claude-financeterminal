import { useState } from 'react';
import { useTerminalStore } from '../store';
import { FileDown, Loader2 } from 'lucide-react';

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
        backgroundColor: '#060a10',
        scale: 1.5,
        logging: false,
        useCORS: true,
      });

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('l', 'mm', 'a4');

      let position = 0;
      const pageHeight = 210;

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
      className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:bg-blue-500/10 hover:border-blue-500/20 hover:text-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {exporting ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <FileDown className="w-3.5 h-3.5 group-hover:text-blue-400 transition-colors" />
      )}
      {exporting ? 'Generating...' : 'Export PDF'}
    </button>
  );
}
