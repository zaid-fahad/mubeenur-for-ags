import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Printer, Phone, Mail, Award, Users, BookOpen, 
  Heart, CheckCircle2, Menu, X, Download, User, Share2, 
  MapPin, Calendar, Info, Vote, ArrowRight, Star, ShieldCheck,
  Zap, Globe, LayoutDashboard, FileText, QrCode
} from 'lucide-react';

// Voter Data based on the uploaded CSV content
const VOTER_DATA =  [
  {
    "name": "S. M. SHAMIN YEASER",
    "id": "22-47708-2",
    "phone": "01762788828"
  },
  {
    "name": "MD. MUSHFIQUR RAHMAN UTSHO",
    "id": "22-46602-1",
    "phone": "01719634629"
  },
  {
    "name": "AYSHEE, SHAJRATUZ ZAMAN",
    "id": "21-45746-3",
    "phone": "01717647677"
  },
  {
    "name": "HASIB, KHONDOKAR SALMAN",
    "id": "22-46988-1",
    "phone": "01612039022"
  },
  {
    "name": "NAHIM AMIN ",
    "id": "22-49239-3",
    "phone": "01306940747"
  },
  {
    "name": "MD. NOORUZZUMAN",
    "id": "22-48082-2",
    "phone": "01728649539"
  },
  {
    "name": "ESRATUL JANNAT JUI",
    "id": "22-49013-3",
    "phone": "01680649117"
  },
  {
    "name": "ADIL AHMED SHAMIM",
    "id": "21-45190-2",
    "phone": "01704387624"
  },
  {
    "name": "AHNAF TAHMID",
    "id": "21-45447-3",
    "phone": "01632078885"
  },
  {
    "name": "SUNIPUN SEEMANTA",
    "id": "22-47547-2",
    "phone": "01839029142"
  },
  {
    "name": "ABU SAYEED KHONDOKER FAHIM",
    "id": "23-51408-1",
    "phone": "01791491386"
  },
  {
    "name": "AHNAAF AKIF KHAN",
    "id": "23-55245-3",
    "phone": "01518987125"
  },
  {
    "name": "ASIF AMAN JIHAD ",
    "id": "23-54555-3",
    "phone": "01785204658"
  },
  {
    "name": "ARIF AHMED",
    "id": "23-55487-3",
    "phone": "01701867757"
  },
  {
    "name": "FAHIMA SULTANA SMRITY",
    "id": "23-51277-1",
    "phone": "01319333679"
  },
  {
    "name": "FARHANA ISLAM POPY",
    "id": "23-55890-3",
    "phone": "01521738929"
  },
  {
    "name": "FATEMA JAHAN SHOSHI",
    "id": "23-55421-3",
    "phone": "01616075349"
  },
  {
    "name": "ABU YUSUF",
    "id": "22-48124-2",
    "phone": "01307872170"
  },
  {
    "name": "FATIMA",
    "id": "23-50170-1",
    "phone": "01408661776"
  },
  {
    "name": "IBRAHIM NIHARIKA ",
    "id": "23-50785-1",
    "phone": "01632650766"
  },
  {
    "name": "INDRONILL DUTTA NILL ",
    "id": "23-50974-1",
    "phone": "01725897030"
  },
  {
    "name": "INSIA TABASSUM",
    "id": "23-50051-1",
    "phone": "01860991005"
  },
  {
    "name": "JOY DEY",
    "id": "22-47668-2",
    "phone": "01752741469"
  },
  {
    "name": "JUBAIR AHMED JESAN",
    "id": "23-51864-2",
    "phone": "01738257924"
  },
  {
    "name": "M.N.S. SHAHRIAR AHASAN",
    "id": "22-47470-2",
    "phone": "01314293029"
  },
  {
    "name": "MD SIAM SIKDER",
    "id": "23-55462-3",
    "phone": "01902148099"
  },
  {
    "name": "MD. NASIF SAFWAN",
    "id": "22-49041-3",
    "phone": "01798994476"
  },
  {
    "name": "MD. NISHAT AHMED KHAN",
    "id": "23-51899-2",
    "phone": "01568764129"
  },
  {
    "name": "MINHAJUL ABAYDIN AMIR",
    "id": "23-55894-3",
    "phone": "01796147427"
  },
  {
    "name": "MUAMMAR DAIJAN FARAZ ",
    "id": "23-50085-1",
    "phone": "01679591510"
  },
  {
    "name": "NILOY PAUL",
    "id": "23-51773-2",
    "phone": "01721298298"
  },
  {
    "name": "ROCKYUZZAMAN ROCKY",
    "id": "23-50263-1",
    "phone": "01760111631"
  },
  {
    "name": "SADIA HOSSAIN",
    "id": "22-48461-3",
    "phone": "01743561659"
  },
  {
    "name": "SAMIM NOOR",
    "id": "23-52262-2",
    "phone": "01406707504"
  },
  {
    "name": "SHAH MAHMODUR RAHMAN",
    "id": "22-47558-2",
    "phone": "01733946670"
  },
  {
    "name": "SHAHADAT HOSSAIN GAZI",
    "id": "22-48095-2",
    "phone": "01609285018"
  },
  {
    "name": "SHAMIHA ZAMAN",
    "id": "23-50588-1",
    "phone": "01317751681"
  },
  {
    "name": "SOUHARDO RAHMAN",
    "id": "22-49068-3",
    "phone": "01400443735"
  },
  {
    "name": "SUDIPTA SARKER UNNAYAN",
    "id": "22-47656-2",
    "phone": "01782753560"
  },
  {
    "name": "MD SAMIUL ISLAM ZIDAN",
    "id": "23-54394-3",
    "phone": "01633012325"
  },
  {
    "name": "MD. MUBEENUR RAHMAN",
    "id": "24-57255-2",
    "phone": "01309542330"
  },
  {
    "name": "SUMAIYA NAWSHIN",
    "id": "24-57201-2",
    "phone": "01406668263"
  },
  {
    "name": "KM MARUF HASAN",
    "id": "24-59014-3",
    "phone": "01828033955"
  },
  {
    "name": "MD.HARUN OR RASHID",
    "id": "24-57302-2",
    "phone": "01741110968"
  },
  {
    "name": "RAKIB RAIHAN RAFI ",
    "id": "24-57960-2",
    "phone": "01833036835"
  },
  {
    "name": "TANSIM JANNAT UPOMA",
    "id": "23-54741-3",
    "phone": "01999007330"
  },
  {
    "name": "RAGIB HASSAN RHYIHM",
    "id": "24-56249-1",
    "phone": "01794501515"
  },
  {
    "name": "FAZILATUN NESA RODSHI",
    "id": "23-52284-2",
    "phone": "01325404797"
  },
  {
    "name": "SANJANA TASNIM MIM",
    "id": "24-58073-2",
    "phone": "01976209921"
  },
  {
    "name": "AREEBAH MYMOONA RAHMAN",
    "id": "24-59963-3",
    "phone": "01819249349"
  },
  {
    "name": "OPI, PARVEZ AHMED",
    "id": "23-51114-1",
    "phone": "01993745864"
  },
  {
    "name": "FARNAZ FARIA",
    "id": "23-54326-3",
    "phone": "01976637109"
  },
  {
    "name": "FARHAN HABIB ABIR",
    "id": "22-48170-2",
    "phone": "01796377294"
  },
  {
    "name": "MD.NAFI ALAM  ",
    "id": "24-59100-3",
    "phone": "01671478411"
  },
  {
    "name": "ADIBA SULTANA",
    "id": "24-59092-3",
    "phone": "01646981468"
  },
  {
    "name": "JAKIA SAIYADA SHIKDER",
    "id": "23-53836-3",
    "phone": "01406141122"
  },
  {
    "name": "ZANNATUL FERDOUS NIJHUM",
    "id": "23-51272-1",
    "phone": "01925916556"
  },
  {
    "name": "MD SHAHANUR GOSSAIN NAHID",
    "id": "25-51918-2",
    "phone": "01751022580"
  },
  {
    "name": "SADIA SULTANA",
    "id": "23-53295-3",
    "phone": "01400846358"
  },
  {
    "name": "SM AHAMMED NAFIZ",
    "id": "24-59549-3",
    "phone": "01716488720"
  },
  {
    "name": "ARINDOM PAUL",
    "id": "23-52901-2",
    "phone": "01703079536"
  },
  {
    "name": "MYSHA RAHMAN",
    "id": "24-58669-2",
    "phone": "01532393186"
  },
  {
    "name": "FADDILAH ISLAM",
    "id": "24-58650-2",
    "phone": "01643396291"
  },
  {
    "name": "TARIQUL ISLAM",
    "id": "23-54685-3",
    "phone": "01518957320"
  },
  {
    "name": "MD. IBRAR MAHMUD RASIN",
    "id": "23-54569-3",
    "phone": "01970378688"
  },
  {
    "name": "AMINUL ISLAM SHANTO",
    "id": "23-55862-3",
    "phone": "01722758264"
  },
  {
    "name": "TASFIA ISLAM RAISHA",
    "id": "23-55710-3",
    "phone": "01633660660"
  },
  {
    "name": "AFIF KARIM RYAN",
    "id": "23-51249-1",
    "phone": "01844576305"
  },
  {
    "name": "ALRIK MAHMUD",
    "id": "23-54666-3",
    "phone": "01773514546"
  },
  {
    "name": "HASAN MAHMUD SHANTO",
    "id": "22-49453-3",
    "phone": "01671665776"
  },
  {
    "name": "MOHAMMAD FAHIM",
    "id": "24-56910-1",
    "phone": "01975499049"
  },
  {
    "name": "REZVINE ENJOY NAKIB",
    "id": "23-50573-1",
    "phone": "01796585024"
  },
  {
    "name": "IMTIAZ AHMED",
    "id": "24-58050-2",
    "phone": "01876711920"
  },
  {
    "name": "NAVED ANJUM SHOCCHO",
    "id": "24-57713-2",
    "phone": "01604309395"
  },
  {
    "name": "MUSHFIQUR RAHMAN",
    "id": "23-54402-3",
    "phone": "01764494061"
  },
  {
    "name": "MD. ZABIR ALI MAHI",
    "id": "23-53456-3",
    "phone": "01305022131"
  },
  {
    "name": "SHAHARIAR SHIRAZ JOY",
    "id": "24-60176-3",
    "phone": "01826631491"
  },
  {
    "name": "TANVIR SIDDIQUE",
    "id": "24-59030-3",
    "phone": "01780747536"
  },
  {
    "name": "AURTHY SARKER",
    "id": "23-54599-3",
    "phone": "01332003827"
  },
  {
    "name": "MD. NAHIDUZZAMAN",
    "id": "23-53719-3",
    "phone": "01736126034"
  },
  {
    "name": "OWISHI HAQUE",
    "id": "24-60272-3",
    "phone": "01985705794"
  },
  {
    "name": "RUBBYA SARWAR",
    "id": "24-58989-3",
    "phone": "01963800170"
  },
  {
    "name": "KHALED MUHAMMAD KAIF",
    "id": "24-55944-1",
    "phone": "01740726630"
  },
  {
    "name": "SAKIL AHMED SOAD",
    "id": "22-48186-2",
    "phone": "01977162954"
  },
  {
    "name": "ALL IMRAN TOHA",
    "id": "25-61024-1",
    "phone": "01315533040"
  },
  {
    "name": "NAZMUS SALEHIN",
    "id": "23-50861-1",
    "phone": "01400303744"
  },
  {
    "name": "MD.SADMAN REZA SIDDIQUEE",
    "id": "24-57318-2",
    "phone": "01568639852"
  },
  {
    "name": "MD. EHSANUL EMRAN SADIB.",
    "id": "22-48511-3",
    "phone": "01315354128"
  },
  {
    "name": "PARVEZ HASAN",
    "id": "23-53159-3",
    "phone": "01300510470"
  },
  {
    "name": "NAZIFA RABIAH MAMUSHA",
    "id": "23-54540-3",
    "phone": "01581403080"
  },
  {
    "name": "SURAIYA HUSSAIN",
    "id": "24-58696-2",
    "phone": "01403914682"
  },
  {
    "name": "MASUMA ALAM",
    "id": "23-55845-3",
    "phone": "01630082041"
  },
  {
    "name": "SARBIK IBNUL RIFAT",
    "id": "22-48025-2",
    "phone": "01643230097"
  },
  {
    "name": "MST NUSRAT JAHAN NIJHUM",
    "id": "23-51211-1",
    "phone": "01722377302"
  },
  {
    "name": "MD FAHIM SHAHRIAR",
    "id": "24-60185-3",
    "phone": "01827164943"
  },
  {
    "name": "A.B.M ABDULLAH AL MAMUN",
    "id": "24-58664-2",
    "phone": "01735235217"
  },
  {
    "name": "MOHAMMAD ARIFUL HAQUE",
    "id": "23-54680-3",
    "phone": "01756369705"
  },
  {
    "name": "MD. WASIF SHAHRIAR",
    "id": "23-53494-3",
    "phone": "01914418181"
  },
  {
    "name": "SHOBNOM MOSTARY",
    "id": "25-61496-1",
    "phone": "01908734597"
  },
  {
    "name": "NAFIZ KHAN",
    "id": "25-61625-1",
    "phone": "01924451741"
  },
  {
    "name": "MAYAZ AHMED",
    "id": "24-59213-3",
    "phone": "01518990331"
  },
  {
    "name": "EKTHEKHER ROSHID SIMON",
    "id": "23-55863-3",
    "phone": "01754305972"
  },
  {
    "name": "NUR-E-JANNAT SIDDIQUEE",
    "id": "23-50538-1",
    "phone": "01816368459"
  },
  {
    "name": "MD MUSHFIK WAHED",
    "id": "25-61618-1",
    "phone": "01886624866"
  },
  {
    "name": "MD MAHEBE SHAWON",
    "id": "24-56677-1",
    "phone": "01681134942"
  },
  {
    "name": "MUTASADDIQ AHNAF TAMZID",
    "id": "24-57056-1",
    "phone": "01560026105"
  },
  {
    "name": "MD. HOSANUR BIN RASHID",
    "id": "23-53933-3",
    "phone": "01879398859"
  },
  {
    "name": "SANJIDA ISLAM",
    "id": "24-59449-3",
    "phone": "01842325584"
  },
  {
    "name": "SAKIB AHMED",
    "id": "24-58295-2",
    "phone": "01710664093"
  },
  {
    "name": "MD. ABDULLAH IBNE AMIN",
    "id": "24-58921-2",
    "phone": "01795255828"
  },
  {
    "name": "NAIMA RAHMAN NEHA",
    "id": "25-60945-1",
    "phone": "01606560921"
  },
  {
    "name": "SAHADAT HOSSAIN NABID",
    "id": "24-57176-2",
    "phone": "01931737858"
  },
  {
    "name": "SADIA SARWAR",
    "id": "24-58821-2",
    "phone": "01822597855"
  },
  {
    "name": "PURNIMA BARUA",
    "id": "24-58341-2",
    "phone": "01889778920"
  },
  {
    "name": "SAJIDUR RAHMAN",
    "id": "24-57005-1",
    "phone": "01608585861"
  },
  {
    "name": "NUSRAT JAHAN",
    "id": "24-58631-2",
    "phone": "01770438647"
  },
  {
    "name": "MOST. MAHFUZA AKTER",
    "id": "23-50810-1",
    "phone": "01575028118"
  },
  {
    "name": "NILANTY SEN",
    "id": "24-57592-2",
    "phone": "01720526404"
  },
  {
    "name": "MD. SHAMIN YEASAR",
    "id": "23-55294-3",
    "phone": "01774735229"
  },
  {
    "name": "TABASSUM MARIA",
    "id": "24-58920-2",
    "phone": "01611044410"
  },
  {
    "name": "RAIHANUL ISLAM FAHIM",
    "id": "24-60016-3",
    "phone": "01836718213"
  },
  {
    "name": "RIAJUL ISLAM HRIDOY",
    "id": "24-58062-2",
    "phone": "01778067678"
  },
  {
    "name": "SHAHRIAR HASAN",
    "id": "24-57819-2",
    "phone": "01738921899"
  },
  {
    "name": "MD.SABBIR HASAN",
    "id": "25-60578-1",
    "phone": "01851163858"
  },
  {
    "name": "TOHOMINA RAHMAN TISHA ",
    "id": "23-54303-3",
    "phone": "01868137954"
  },
  {
    "name": "FARHAN ISTIAQUE",
    "id": "23-54380-3",
    "phone": "01315883215"
  },
  {
    "name": "FARHAN HABIB ABIR",
    "id": "22-48170-2",
    "phone": "01796377294"
  },
  {
    "name": "MD. HASANUR BIN RASHID",
    "id": "23-54512-3",
    "phone": "01824822492"
  }
]  ;

const CANDIDATE_IMAGE = "/mubeen.jpeg";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slipCanvasRef = useRef(null);

  const playSfx = () => {
    const audio = new Audio('/fahh.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const filteredVoters = useMemo(() => {
    if (searchTerm.length < 2) return [];
    const lower = searchTerm.toLowerCase();
    return VOTER_DATA.filter(v => 
      v.name.toLowerCase().includes(lower) || v.id.includes(searchTerm)
    ).slice(0, 5);
  }, [searchTerm]);

  const handlePrint = () => {
    playSfx();
    setTimeout(() => window.print(), 200);
  };

  const handleDownload = () => {
    if (!selectedVoter) return;
    playSfx();
    const canvas = slipCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set Canvas to A5 Ratio (High Resolution)
    canvas.width = 1000;
    canvas.height = 707;
    
    const drawContent = () => {
      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Main Border (Sea Green)
      ctx.strokeStyle = '#2E8B57';
      ctx.lineWidth = 20;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      
      // Logo Box
      ctx.fillStyle = '#2E8B57';
      const logoSize = 60;
      const margin = 50;
      ctx.beginPath();
      ctx.roundRect(margin, margin, logoSize, logoSize, 12);
      ctx.fill();
      
      // Heart icon
      ctx.fillStyle = 'white';
      const heartX = margin + logoSize / 2;
      const heartY = margin + logoSize / 2 + 4;
      const hr = 14;
      ctx.beginPath();
      ctx.moveTo(heartX, heartY + hr);
      ctx.bezierCurveTo(heartX - hr, heartY - hr/2, heartX - hr, heartY - hr*1.5, heartX, heartY - hr);
      ctx.bezierCurveTo(heartX + hr, heartY - hr*1.5, heartX + hr, heartY - hr/2, heartX, heartY + hr);
      ctx.fill();

      // Header Text
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2E8B57';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('AIUB SOCIAL WELFARE CLUB - SHOMOY', margin + 80, margin + 15);
      
      ctx.fillStyle = '#064e3b';
      ctx.font = '900 42px sans-serif';
      ctx.fillText('MUBEENUR RAHMAN', margin + 80, margin + 65);
      
      ctx.fillStyle = '#64748b';
      ctx.font = 'italic bold 20px sans-serif';
      ctx.fillText('Assistant General Secretary Candidate (24-57255-2)', margin + 80, margin + 95);

      // Voter Section Box
      const boxY = 190;
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(margin, boxY, canvas.width - (margin * 2), 200);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(margin, boxY, canvas.width - (margin * 2), 200);
      
      ctx.fillStyle = '#2E8B57';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('OFFICIAL VOTER CONFIRMATION', margin + 30, boxY + 40);
      
      ctx.fillStyle = '#0f172a';
      ctx.font = '900 40px sans-serif';
      const voterName = selectedVoter.name.toUpperCase();
      ctx.fillText(voterName.length > 25 ? voterName.substring(0, 25) + '...' : voterName, margin + 30, boxY + 100);
      
      ctx.fillStyle = '#2E8B57';
      ctx.font = '900 30px monospace';
      ctx.fillText(`ID: ${selectedVoter.id}`, margin + 30, boxY + 150);

      // QR Code Placeholder
      const qrSize = 100;
      const qrX = canvas.width - margin - qrSize - 30;
      const qrY = boxY + 30;
      ctx.strokeStyle = '#dddddd';
      ctx.lineWidth = 1;
      ctx.strokeRect(qrX, qrY, qrSize, qrSize);
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(qrX + 1, qrY + 1, qrSize - 2, qrSize - 2);
      ctx.fillStyle = '#2E8B57';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QR', qrX + qrSize/2, qrY + qrSize/2 + 10);

      // Footer
      const footerY = 600;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#64748b';
      ctx.font = '900 14px sans-serif';
      ctx.fillText('CAMPAIGN VISION', margin, footerY - 20);
      ctx.fillStyle = '#064e3b';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('Digitalization & Transparency for AIUB SHOMOY.', margin, footerY + 10);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#2E8B57';
      ctx.font = '900 50px sans-serif';
      ctx.fillText('#VOTE4MUBEEN', canvas.width - margin, footerY + 10);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'italic bold 16px sans-serif';
      ctx.fillText('Leading through Service.', canvas.width - margin, footerY + 35);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const pWidth = 120;
        const pHeight = 150;
        const pX = canvas.width - margin - pWidth;
        const pY = margin - 5;
        ctx.fillStyle = 'white';
        ctx.fillRect(pX - 5, pY - 5, pWidth + 10, pHeight + 10);
        ctx.drawImage(img, pX, pY, pWidth, pHeight);
        
        const link = document.createElement('a');
        link.download = `Mubeen_Slip_${selectedVoter.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = CANDIDATE_IMAGE;
    };
    drawContent();
  };

  const navLinks = [
    { name: 'Home', href: '#home', icon: <LayoutDashboard size={16}/> },
    { name: 'Manifesto', href: '#vision', icon: <FileText size={16}/> },
    { name: 'Voter Slip', href: '#voter-info', icon: <Search size={16}/> },
    { name: 'Contact', href: '#contact', icon: <Phone size={16}/> },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth selection:bg-emerald-100 overflow-x-hidden">
      <style>
        {`
          @import "tailwindcss";

          @theme {
            --color-sea-green: #2E8B57;
            --color-sea-deep: #064e3b;
            --color-campaign-amber: #f59e0b;
            --animate-float: float 5s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            50% { transform: translateY(-8px) rotate(1deg); }
          }

          .hero-dot-pattern {
            background-image: radial-gradient(var(--color-sea-green) 0.6px, transparent 0.6px);
            background-size: 20px 20px;
          }

          @media print {
            @page { size: A5 landscape; margin: 0; }
            body * { visibility: hidden; }
            #printable-slip, #printable-slip * { visibility: visible; }
            #printable-slip {
              position: fixed;
              left: 0; top: 0; 
              width: 210mm;
              height: 148mm;
              background: white !important;
              z-index: 10000;
              display: flex !important;
              flex-direction: column;
              padding: 0; margin: 0;
              box-sizing: border-box;
            }
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--color-sea-green)]/95 backdrop-blur-md text-white shadow-lg h-14 md:h-16 flex items-center print:hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 md:p-1.5 rounded-lg shadow-md">
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-[var(--color-sea-green)]" fill="currentColor" />
            </div>
            <div className="leading-none">
              <span className="font-black text-base md:text-xl tracking-tighter">SHOMOY</span>
              <p className="text-[7px] md:text-[8px] font-black uppercase tracking-wider text-emerald-200">AIUB SWC</p>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-8 font-black uppercase text-[10px] tracking-widest">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-amber-400 transition-colors py-1.5 relative group">
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-1.5 bg-white/10 rounded-lg active:scale-95">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-[var(--color-sea-deep)] shadow-xl lg:hidden p-4 animate-in slide-in-from-top-4 duration-300">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-3.5 font-black text-base border-b border-white/10 active:text-amber-400">
                {link.icon} {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <header id="home" className="relative pt-24 pb-32 md:pt-32 md:pb-48 bg-[var(--color-sea-green)] text-white overflow-hidden print:hidden">
        <div className="absolute inset-0 hero-dot-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          <div className="w-full lg:w-3/5 text-center lg:text-left space-y-6 animate-in slide-in-from-left-6 duration-700">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-wider shadow-xl">
              <Vote size={12} /> AIUB SOCIAL WELFARE CLUB
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter drop-shadow-xl">
              MUBEENUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-white">RAHMAN</span>
            </h1>
            
            <p className="text-lg md:text-2xl font-bold opacity-90 max-w-xl">
              Candidate for <span className="text-amber-400 italic">Assistant General Secretary</span> (2025-26)
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
              <a href="#voter-info" className="w-full sm:w-auto bg-white text-[var(--color-sea-green)] px-8 py-4 rounded-2xl font-black text-lg hover:bg-amber-400 hover:text-emerald-950 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 group">
                GET VOTER SLIP <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
  
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex justify-center animate-in zoom-in-95 duration-700 delay-100">
            <div className="relative group">
              <div className="absolute -inset-6 bg-amber-400/20 rounded-[4rem] blur-2xl animate-pulse"></div>
              <div className="relative bg-white p-3 rounded-[3.5rem] md:rounded-[4rem] shadow-xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <div className="w-[240px] md:w-[320px] aspect-[4/5] bg-slate-100 rounded-[3rem] md:rounded-[3.5rem] overflow-hidden border-[10px] border-white relative">
                  <img src={CANDIDATE_IMAGE} alt="Mubeenur" className="w-full h-full object-cover grayscale-[5%] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[var(--color-sea-deep)] via-[var(--color-sea-deep)]/70 to-transparent p-6 pt-16 text-center">
                    <p className="text-white font-black text-lg md:text-xl leading-none mb-1">MUBEENUR RAHMAN</p>
                    <p className="text-amber-400 font-bold text-[8px] uppercase tracking-widest">AGS CANDIDATE</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 bg-amber-400 rounded-full border-4 border-[var(--color-sea-green)] shadow-xl flex flex-col items-center justify-center animate-[float_6s_infinite] z-20">
                 <span className="font-black text-emerald-950 text-2xl md:text-3xl">#1</span>
                 <span className="text-[8px] font-black text-emerald-950">POSITION</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Manifesto */}
      <section id="vision" className="py-16 md:py-24 max-w-7xl mx-auto px-6 print:hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <span className="text-[var(--color-sea-green)] font-black tracking-widest uppercase text-[10px] block">Mission 2025-2026</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter">Leading with <br/><span className="text-[var(--color-sea-green)] italic">Digital Vision</span></h2>
              <div className="space-y-4 pt-4">
                 {[
                   { icon: <ShieldCheck size={20} className="text-amber-500"/>, title: "Transparency", desc: "Digital auditing of project funds." },
                   { icon: <Zap size={20} className="text-emerald-600"/>, title: "Digitalization", desc: "Automated tracking & certs." },
                   { icon: <Users size={20} className="text-blue-500"/>, title: "Inclusivity", desc: "Feedback for all freshmen." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100 group">
                      <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[var(--color-sea-green)] group-hover:text-white transition-colors">{item.icon}</div>
                      <div>
                        <h4 className="text-base font-black text-slate-800 mb-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-xs font-medium">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[var(--color-sea-deep)] rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                 <h3 className="text-xl font-black mb-6 text-amber-400 uppercase tracking-widest">Roadmap</h3>
                 <ul className="space-y-5">
                    {["Standard Records", "Member Portal", "Alumni Mentorship", "Impact Expansion", "Merit Voting"].map((p, i) => (
                      <li key={i} className="flex gap-4 items-center group">
                        <div className="w-8 h-8 rounded-lg border border-amber-400 flex items-center justify-center font-black text-xs group-hover:bg-amber-400 group-hover:text-emerald-950 transition-all">{i+1}</div>
                        <p className="text-base font-bold opacity-90">{p}</p>
                      </li>
                    ))}
                 </ul>
              </div>
              <Vote className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 rotate-12" />
           </div>
        </div>
      </section>

      {/* Voter Search Portal */}
      <section id="voter-info" className="py-20 bg-slate-900 print:hidden overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,var(--color-sea-green)_0%,transparent_60%)] opacity-20"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 shadow-2xl border-t-[12px] border-amber-400">
            <div className="text-center mb-8">
              <span className="text-[var(--color-sea-green)] font-black tracking-widest uppercase text-[9px] mb-2 block">Voter Action Portal</span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Print Voting Slip</h2>
              <p className="text-slate-500 mt-2 text-sm md:text-base">Enter your AIUB ID or Name.</p>
            </div>

            <div className="relative group mb-8 max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search size={20} className="text-[var(--color-sea-green)]" />
              </div>
              <input
                type="text"
                className="block w-full pl-14 pr-6 py-4 md:py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[var(--color-sea-green)]/10 focus:border-[var(--color-sea-green)] transition-all text-base font-bold placeholder:text-slate-300"
                placeholder="ID: 24-57255-2"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setSelectedVoter(null); }}
              />
            </div>

            {filteredVoters.length > 0 && !selectedVoter && (
              <div className="grid gap-2 mb-8 max-w-lg mx-auto overflow-hidden">
                {filteredVoters.map((voter) => (
                  <button key={voter.id} className="flex items-center justify-between p-4 bg-white hover:bg-emerald-50 rounded-xl border border-slate-100 hover:border-[var(--color-sea-green)] transition-all text-left group active:scale-95" onClick={() => { setSelectedVoter(voter); setSearchTerm(''); }}>
                    <div className="truncate pr-4">
                      <p className="font-black text-slate-900 text-sm uppercase truncate">{voter.name}</p>
                      <p className="text-[var(--color-sea-green)] font-black font-mono text-xs">{voter.id}</p>
                    </div>
                    <ArrowRight size={16} className="shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {selectedVoter && (
              <div className="animate-in zoom-in-95 duration-500 max-w-lg mx-auto">
                <div className="bg-white border-8 border-[var(--color-sea-green)] rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-[var(--color-sea-green)] p-3.5 rounded-2xl shadow-md"><User size={24} className="text-white" /></div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm md:text-lg font-black uppercase tracking-tighter truncate">{selectedVoter.name}</h4>
                        <p className="text-[var(--color-sea-green)] font-black font-mono text-sm uppercase">{selectedVoter.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <button onClick={handlePrint} className="bg-[var(--color-sea-green)] text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 shadow-lg"><Printer size={18} /> PRINT</button>
                    <button onClick={handleDownload} className="bg-slate-900 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 shadow-lg"><Download size={18} className="text-amber-400" /> DOWNLOAD</button>
                  </div>
                  <p className="text-center text-[var(--color-sea-green)] font-black text-lg italic tracking-tighter">#VOTE4MUBEEN</p>
                </div>
                <canvas ref={slipCanvasRef} width="1000" height="707" className="hidden" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* A5 Print Slip */}
      <div id="printable-slip" className="hidden">
        <div style={{ 
          width: '210mm', height: '148mm', 
          backgroundColor: 'white', border: '12px solid #2E8B57', 
          boxSizing: 'border-box', padding: '10mm', 
          display: 'flex', flexDirection: 'column', 
          justifyContent: 'space-between', fontFamily: 'sans-serif', color: 'black',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
               <div style={{ backgroundColor: '#2E8B57', padding: '10px', borderRadius: '12px' }}>
                  <Heart size={32} color="white" fill="white" />
               </div>
               <div>
                  <p style={{ margin: 0, fontWeight: 900, color: '#2E8B57', letterSpacing: '1px', fontSize: '11px' }}>AIUB SOCIAL WELFARE CLUB - SHOMOY</p>
                  <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: '#064e3b', lineHeight: 1 }}>MUBEENUR RAHMAN</h1>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#64748b', fontStyle: 'italic' }}>Assistant General Secretary Candidate (24-57255-2)</p>
               </div>
            </div>
            <div style={{ width: '80px', height: '100px', borderRadius: '12px', border: '4px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
               <img src={CANDIDATE_IMAGE} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Mubeen" />
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '2px solid #e2e8f0', margin: '10px 0', position: 'relative' }}>
             <p style={{ margin: 0, fontWeight: 900, fontSize: '10px', letterSpacing: '2px', color: '#2E8B57' }}>OFFICIAL VOTER CONFIRMATION</p>
             <h2 style={{ margin: '8px 0 2px 0', fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedVoter?.name || "MEMBER NAME"}</h2>
             <p style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#2E8B57', fontFamily: 'monospace' }}>MEMBER ID: {selectedVoter?.id || "XX-XXXXX-X"}</p>
             
             <div style={{ position: 'absolute', top: '15px', right: '15px', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
                   <QrCode size={44} color="#2E8B57" />
                </div>
                <p style={{ fontSize: '7px', fontWeight: 'bold', color: '#94a3b8', marginTop: '4px' }}>VERIFY SCAN</p>
             </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
             <div style={{ maxWidth: '350px' }}>
                <p style={{ margin: 0, fontWeight: 900, fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Vision</p>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#064e3b', lineHeight: 1.3 }}>Digitalization & Transparency for AIUB SHOMOY.</p>
             </div>
             <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '40px', fontWeight: 900, color: '#2E8B57', letterSpacing: '-1.5px', lineHeight: 1 }}>#VOTE4MUBEEN</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', fontWeight: 'bold', fontStyle: 'italic', color: '#f59e0b' }}>Leading through Service.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-20 border-t border-white/5 relative overflow-hidden print:hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-3 text-white mb-6">
              <div className="bg-[var(--color-sea-green)] p-3 rounded-xl">
                <Heart size={24} fill="currentColor" />
              </div>
              <span className="font-black text-3xl tracking-tighter uppercase">MUBEENUR</span>
            </div>
            <p className="text-lg font-bold text-slate-200 italic border-l-4 border-amber-400 pl-6 mb-8">
              "Building a digital ecosystem for AIUB SHOMOY."
            </p>
            <div className="flex gap-4">
               {[Phone, Mail, Share2].map((Icon, idx) => (
                 <a key={idx} href={Icon === Phone ? 'tel:01309542330' : '#'} className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[var(--color-sea-green)] hover:text-white transition-all active:scale-95 shadow-lg">
                   <Icon size={20} />
                 </a>
               ))}
            </div>
          </div>
          
          <div className="bg-emerald-900/10 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5">
            <h4 className="text-white font-black text-base mb-8 uppercase tracking-widest text-center lg:text-left">Campaign Desk</h4>
            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-[var(--color-sea-green)] rounded-xl flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Phone</p>
                  <a href="tel:01309542330" className="text-2xl font-black text-white hover:text-amber-400">01309542330</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Nav Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[var(--color-sea-deep)]/95 backdrop-blur-xl border-t border-white/10 lg:hidden flex justify-around py-3 pb-6 px-4 z-50 print:hidden">
         {navLinks.map(link => (
            <a key={link.name} href={link.href} className="flex flex-col items-center gap-1 text-emerald-300 hover:text-amber-400 transition-colors active:scale-90">
               {link.icon}
               <span className="text-[8px] font-black uppercase tracking-widest">{link.name}</span>
            </a>
         ))}
      </div>
    </div>
  );
};

export default App;
