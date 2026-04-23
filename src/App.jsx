import React, { useState, useCallback, useMemo } from "react";
import {
  Building2, Users, FileText, BarChart3, Package, ShoppingCart,
  DollarSign, Calendar, MessageSquare, FolderOpen, CloudSun, Camera,
  ChevronRight, ChevronDown, Bell, Search, Menu, X, Plus, Filter,
  CheckCircle2, Clock, AlertTriangle, XCircle, ArrowRight, ArrowLeft,
  Home, Settings, LogOut, Eye, Edit, Trash2, Download, Upload,
  MapPin, Phone, Mail, Globe, Star, TrendingUp, TrendingDown,
  Layers, Hammer, Truck, Wrench, Palette, Zap, Droplets,
  ClipboardList, FileCheck, Send, Lock, Unlock, RefreshCw,
  LayoutDashboard, PieChart, Activity, Target, Award, Briefcase,
  HardHat, Ruler, Calculator, Boxes, Receipt, CreditCard,
  Video, Shield, Brain, ChevronUp, MoreHorizontal, ExternalLink,
  UserCheck, UserX, GraduationCap, Gauge, BookOpen, AlertCircle,
  BarChart2, Percent, CircleDot, ArrowUpRight, ArrowDownRight,
  Hash, Bookmark, Sliders, Database, History, FileWarning,
  ShieldCheck, ShieldAlert, GitBranch, ListChecks, Banknote,
  Store, FileSpreadsheet, Warehouse, PackageCheck, AlertOctagon,
  KeyRound, Fingerprint, BadgeCheck, CircleCheck, CircleX, Minus,
  ChevronLeft, MoreVertical, Clipboard, Link2, Info, Table2
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════ */
const C = {
  primary:"#18B7D2", primaryDark:"#0E95AD", primaryDeep:"#0A7B94",
  primaryLight:"#E0F5F9", primaryGhost:"#F0FAFB",
  secondary:"#6BC0AA", secondaryDark:"#4FA08B", secondaryLight:"#E8F5F0",
  dark:"#1D1D1B", dark2:"#2A2A28",
  darkGray:"#374151", gray:"#6B7280", lightGray:"#9CA3AF", faintGray:"#D1D5DB",
  border:"#E5E7EB", borderLight:"#F3F4F6",
  bg:"#F7F8FA", bgCard:"#FFFFFF",
  success:"#10B981", successLight:"#D1FAE5", successDark:"#065F46",
  warning:"#F59E0B", warningLight:"#FEF3C7", warningDark:"#92400E",
  danger:"#EF4444", dangerLight:"#FEE2E2", dangerDark:"#991B1B",
  info:"#3B82F6", infoLight:"#DBEAFE", infoDark:"#1E40AF",
  purple:"#8B5CF6", purpleLight:"#EDE9FE", purpleDark:"#5B21B6",
};

/* ═══════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════ */
const USERS=[
  {id:1,nom:"Marie Atangana",email:"m.atangana@koma.cm",role:"SPOC",roles2:[],statut:"Actif",onboarding:"Opérationnel",maturite:"Confirmé",adoption:94,projets:3,conn:"18/04/2026 09:12",actions7j:28,incidents:0,habs:["CRM","Devis","Validation projet","Facturation","GED"],modulesWeak:[],qualite:"Excellente",sessions:42,docsTraites:67,validations:23,rejet:1},
  {id:2,nom:"Fabien Nkoulou",email:"f.nkoulou@koma.cm",role:"SPOC",roles2:[],statut:"Actif",onboarding:"Qualifié",maturite:"Autonome",adoption:78,projets:1,conn:"17/04/2026 16:40",actions7j:14,incidents:1,habs:["CRM","Devis"],modulesWeak:["Facturation","GED"],qualite:"Bonne",sessions:28,docsTraites:19,validations:8,rejet:0},
  {id:3,nom:"Samuel Kamga",email:"s.kamga@wecare.cm",role:"AMOA",roles2:["Acheteur"],statut:"Actif",onboarding:"Opérationnel",maturite:"Référent",adoption:97,projets:2,conn:"18/04/2026 08:45",actions7j:35,incidents:0,habs:["Validation","Rapports","Achats","Stock","Devis","GED","Finance"],modulesWeak:[],qualite:"Excellente",sessions:51,docsTraites:89,validations:45,rejet:3},
  {id:4,nom:"Boris Ekambi",email:"b.ekambi@btp-cm.cm",role:"MOEX",roles2:[],statut:"Actif",onboarding:"Qualifié",maturite:"Autonome",adoption:82,projets:1,conn:"18/04/2026 07:30",actions7j:22,incidents:2,habs:["Rapports terrain","Stock","Tâches"],modulesWeak:["Achats"],qualite:"Bonne",sessions:35,docsTraites:41,validations:5,rejet:0},
  {id:5,nom:"Arc. Henri Njoya",email:"njoya@archi.cm",role:"MOE",roles2:[],statut:"Actif",onboarding:"En onboarding",maturite:"Assisté",adoption:45,projets:1,conn:"15/04/2026 11:20",actions7j:5,incidents:0,habs:["Plans","Études"],modulesWeak:["GED","Tâches","Planning"],qualite:"À évaluer",sessions:8,docsTraites:6,validations:2,rejet:0},
  {id:6,nom:"Jean-Pierre Fouda",email:"jp.fouda@yahoo.fr",role:"Client",roles2:[],statut:"Actif",onboarding:"Opérationnel",maturite:"Autonome",adoption:88,projets:1,conn:"18/04/2026 20:05",actions7j:8,incidents:0,habs:["Consultation","Paiement","Messages"],modulesWeak:[],qualite:"—",sessions:22,docsTraites:12,validations:4,rejet:0},
  {id:7,nom:"Moussa Ndiaye",email:"m.ndiaye@gmail.com",role:"Client",roles2:[],statut:"Actif",onboarding:"En onboarding",maturite:"Découverte",adoption:32,projets:1,conn:"14/04/2026 16:40",actions7j:3,incidents:0,habs:["Consultation"],modulesWeak:["Paiement","GED","Messages"],qualite:"—",sessions:5,docsTraites:1,validations:0,rejet:0},
  {id:8,nom:"Amina Tchouangou",email:"a.tchouangou@outlook.com",role:"Client",roles2:[],statut:"Actif",onboarding:"Invité",maturite:"Découverte",adoption:10,projets:0,conn:"—",actions7j:0,incidents:0,habs:[],modulesWeak:["Tout"],qualite:"—",sessions:0,docsTraites:0,validations:0,rejet:0},
  {id:9,nom:"Ex. Ateba",email:"ateba@ex-moe.cm",role:"MOE",roles2:[],statut:"Inactif",onboarding:"Suspendu",maturite:"—",adoption:0,projets:0,conn:"02/01/2026",actions7j:0,incidents:3,habs:[],modulesWeak:[],qualite:"—",sessions:0,docsTraites:0,validations:0,rejet:0},
  {id:10,nom:"Pauline Essomba",email:"p.essomba@koma.cm",role:"AMOA",roles2:[],statut:"Actif",onboarding:"En onboarding",maturite:"Assisté",adoption:55,projets:1,conn:"17/04/2026 14:30",actions7j:9,incidents:1,habs:["Rapports","Validation"],modulesWeak:["Achats","Stock","Devis"],qualite:"En progression",sessions:18,docsTraites:14,validations:6,rejet:1},
];

const PROSPECTS=[
  {id:"P-2026-001",nom:"Moussa Ndiaye",type:"Construction neuve",bien:"Villa",region:"Douala",budget:"85M",statut:"En revue",score:87,spoc:"Marie Atangana",source:"Site web",dernAction:"Appel qualification",delai:2,qualFiche:92,finance:"Oui",date:"10/04"},
  {id:"P-2026-002",nom:"Amina Tchouangou",type:"Rénovation",bien:"Appt",region:"Yaoundé",budget:"25M",statut:"En attente",score:62,spoc:"F. Nkoulou",source:"Recommandation",dernAction:"Email bienvenue",delai:4,qualFiche:68,finance:"Non",date:"14/04"},
  {id:"P-2026-003",nom:"Jean-Pierre Fouda",type:"Construction neuve",bien:"Duplex",region:"Kribi",budget:"120M",statut:"Converti",score:94,spoc:"Marie Atangana",source:"Événement diaspora",dernAction:"Conversion projet",delai:0,qualFiche:98,finance:"Oui",date:"28/03"},
  {id:"P-2026-004",nom:"Cécile Ngono",type:"Reprise chantier",bien:"Villa",region:"Bafoussam",budget:"45M",statut:"En revue",score:71,spoc:"Marie Atangana",source:"Site web",dernAction:"Envoi devis préliminaire",delai:10,qualFiche:85,finance:"En cours",date:"08/04"},
  {id:"P-2026-005",nom:"Franck Mbarga",type:"Ameublement",bien:"Appt",region:"Douala",budget:"18M",statut:"En attente",score:55,spoc:"—",source:"Réseaux sociaux",dernAction:"Formulaire soumis",delai:3,qualFiche:45,finance:"Non",date:"15/04"},
  {id:"P-2026-006",nom:"Pierre Tagne",type:"Construction neuve",bien:"Immeuble R+3",region:"Douala",budget:"250M",statut:"En revue",score:91,spoc:"Marie Atangana",source:"Partenaire Connect",dernAction:"Visite terrain planifiée",delai:1,qualFiche:95,finance:"Oui",date:"16/04"},
  {id:"P-2026-007",nom:"Hélène Mbouda",type:"Rénovation",bien:"Maison",region:"Yaoundé",budget:"35M",statut:"Abandonné",score:38,spoc:"F. Nkoulou",source:"Site web",dernAction:"3 relances sans réponse",delai:21,qualFiche:52,finance:"Non",date:"25/03"},
];

const PROJECTS=[
  {id:"PRJ-001",nom:"Villa Éden — Douala Bonamoussadi",client:"J-P. Fouda",type:"Construction neuve",phase:"Exécution",statut:"Actif",budget:120000000,dep:52800000,avt:44,sante:"Bon",risque:"Faible",spoc:"Marie Atangana",moex:"BTP Cameroun",amoa:"S. Kamga",ville:"Douala",alertes:1,jalon:"Plancher R+1 — 25/04",validPend:1},
  {id:"PRJ-002",nom:"Résidence Kotto — Douala",client:"M. Ndiaye",type:"Construction neuve",phase:"Devis",statut:"En validation",budget:85000000,dep:2100000,avt:8,sante:"Attention",risque:"Moyen",spoc:"Marie Atangana",moex:"—",amoa:"S. Kamga",ville:"Douala",alertes:2,jalon:"Validation devis — 22/04",validPend:3},
  {id:"PRJ-003",nom:"Rénovation Bastos — Yaoundé",client:"A. Tchouangou",type:"Rénovation",phase:"Pré-faisabilité",statut:"Brouillon",budget:25000000,dep:0,avt:0,sante:"En attente",risque:"Faible",spoc:"F. Nkoulou",moex:"—",amoa:"P. Essomba",ville:"Yaoundé",alertes:0,jalon:"Étude géotech — 30/04",validPend:0},
];

const FINANCE_DATA=[
  {id:"DDC-001",type:"Décaissement",projet:"PRJ-001",objet:"Paiement main d'œuvre — Mars 2026",montant:3200000,statut:"Validé",demandeur:"S. Kamga",valideur:"Marie Atangana",date:"01/04/2026",pieces:2,fournisseur:"—"},
  {id:"DDC-002",type:"Décaissement",projet:"PRJ-001",objet:"Approvisionnement matériaux — Phase 2",montant:8400000,statut:"En attente validation",demandeur:"S. Kamga",valideur:"—",date:"10/04/2026",pieces:3,fournisseur:"SOCATRAL"},
  {id:"DDC-003",type:"Décaissement",projet:"PRJ-001",objet:"Paiement acompte fondation MOEX",montant:14250000,statut:"Payé",demandeur:"Marie Atangana",valideur:"Admin KOMA",date:"15/02/2026",pieces:4,fournisseur:"BTP Cameroun"},
  {id:"FAC-001",type:"Facture client",projet:"PRJ-001",objet:"Acompte Gros Œuvre — Lot II",montant:14250000,statut:"Payée",demandeur:"AMOA",valideur:"SPOC",date:"15/02/2026",pieces:1,fournisseur:"—"},
  {id:"FAC-002",type:"Facture client",projet:"PRJ-001",objet:"Études géotechniques",montant:1750000,statut:"Payée",demandeur:"AMOA",valideur:"SPOC",date:"20/01/2026",pieces:1,fournisseur:"—"},
  {id:"FAC-003",type:"Facture client",projet:"PRJ-001",objet:"Approvisionnement matériaux — Phase 2",montant:8400000,statut:"En attente",demandeur:"AMOA",valideur:"—",date:"10/04/2026",pieces:1,fournisseur:"—"},
  {id:"FAC-004",type:"Facture fournisseur",projet:"PRJ-001",objet:"Livraison ciment + agglos (SOCATRAL)",montant:5850000,statut:"À rapprocher",demandeur:"Acheteur",valideur:"AMOA",date:"12/04/2026",pieces:2,fournisseur:"SOCATRAL"},
  {id:"PAY-001",type:"Paiement client",projet:"PRJ-001",objet:"Virement J-P. Fouda — Acompte",montant:25000000,statut:"Reçu",demandeur:"Client",valideur:"Système",date:"10/01/2026",pieces:1,fournisseur:"—"},
  {id:"PAY-002",type:"Paiement client",projet:"PRJ-001",objet:"Virement J-P. Fouda — 2ème tranche",montant:20000000,statut:"Reçu",demandeur:"Client",valideur:"Système",date:"01/03/2026",pieces:1,fournisseur:"—"},
];

const MARKETPLACE_DATA=[
  {id:"CMD-001",fournisseur:"SOCATRAL",projet:"PRJ-001",articles:"Ciment CPJ 50kg ×200, Agglos 15 ×1000",montant:4450000,statut:"Livrée",dateCmd:"05/04",dateLiv:"08/04",ecartQte:"0%",ecartQual:"RAS"},
  {id:"CMD-002",fournisseur:"QUINCAMPOIX",projet:"PRJ-001",articles:"Fer HA 12mm ×150, Fil recuit ×20",montant:1280000,statut:"En transit",dateCmd:"12/04",dateLiv:"19/04 (est.)",ecartQte:"—",ecartQual:"—"},
  {id:"CMD-003",fournisseur:"SOCATRAL",projet:"PRJ-001",articles:"Sable carrière ×15m³",montant:120000,statut:"Réceptionnée",dateCmd:"01/04",dateLiv:"03/04",ecartQte:"-5%",ecartQual:"Humidité élevée"},
  {id:"CMD-004",fournisseur:"ENEO SUPPLIES",projet:"PRJ-001",articles:"Câble 2.5mm² ×10 rouleaux",montant:280000,statut:"En attente validation",dateCmd:"17/04",dateLiv:"—",ecartQte:"—",ecartQual:"—"},
];

const SUPPLIERS=[
  {id:"FRN-001",nom:"SOCATRAL",ville:"Douala",cat:"Gros-Oeuvre",articles:12,cmds:8,montantTotal:"18.5M",delaiMoyen:"3j",qualite:4.2,incidents:1,statut:"Actif"},
  {id:"FRN-002",nom:"QUINCAMPOIX",ville:"Douala",cat:"Ferraillage / Quincaillerie",articles:25,cmds:3,montantTotal:"4.2M",delaiMoyen:"5j",qualite:3.8,incidents:0,statut:"Actif"},
  {id:"FRN-003",nom:"ENEO SUPPLIES",ville:"Douala",cat:"Électricité",articles:18,cmds:2,montantTotal:"1.1M",delaiMoyen:"4j",qualite:4.0,incidents:0,statut:"Actif"},
  {id:"FRN-004",nom:"CAMWATER DISTRIB",ville:"Yaoundé",cat:"Plomberie",articles:15,cmds:0,montantTotal:"0",delaiMoyen:"—",qualite:"—",incidents:0,statut:"Actif"},
];

const AUDIT_LOGS=[
  {date:"18/04 09:12",user:"Marie Atangana",role:"SPOC",action:"Connexion",cible:"Session ouverte",module:"Système",crit:"Info",result:"OK"},
  {date:"18/04 08:55",user:"S. Kamga",role:"AMOA",action:"Validation",cible:"Rapport RJ-2026-04-17",module:"Rapports",crit:"Normale",result:"Approuvé"},
  {date:"18/04 08:45",user:"B. Ekambi",role:"MOEX",action:"Création",cible:"Rapport RJ-2026-04-18",module:"Rapports",crit:"Normale",result:"OK"},
  {date:"18/04 07:30",user:"Système",role:"Auto",action:"Alerte",cible:"Stock critique câble 2.5mm²",module:"Stock",crit:"Haute",result:"Notifié"},
  {date:"17/04 18:00",user:"Système",role:"Auto",action:"Relance",cible:"MOEX — rapport non soumis",module:"Rapports",crit:"Haute",result:"Envoyé"},
  {date:"17/04 16:40",user:"F. Nkoulou",role:"SPOC",action:"Modification",cible:"Prospect P-2026-002 — budget",module:"CRM",crit:"Normale",result:"OK"},
  {date:"17/04 14:30",user:"P. Essomba",role:"AMOA",action:"Création",cible:"Demande achat DA-009",module:"Achats",crit:"Normale",result:"OK"},
  {date:"17/04 11:20",user:"Admin",role:"Admin",action:"Modif. droits",cible:"Arc. Njoya — ajout GED",module:"Utilisateurs",crit:"Haute",result:"OK"},
  {date:"17/04 09:00",user:"Système",role:"Auto",action:"Alerte météo",cible:"Pluie forte 19/04 — Douala",module:"Météo",crit:"Haute",result:"Notifié"},
  {date:"16/04 15:30",user:"Marie Atangana",role:"SPOC",action:"Envoi facture",cible:"FAC-003 → J-P. Fouda",module:"Facturation",crit:"Normale",result:"OK"},
  {date:"16/04 14:00",user:"S. Kamga",role:"AMOA",action:"Modif. devis",cible:"Devis PRJ-001 — Lot III",module:"Devis",crit:"Haute",result:"OK"},
  {date:"16/04 10:00",user:"Système",role:"Auto",action:"Alerte caméra",cible:"CAM-004 RTSP interrompu",module:"Vidéo",crit:"Critique",result:"Alerte active"},
  {date:"15/04 18:45",user:"B. Ekambi",role:"MOEX",action:"Mise à jour",cible:"Tâche O5 — avt 85%",module:"Tâches",crit:"Normale",result:"OK"},
  {date:"15/04 11:20",user:"S. Kamga",role:"AMOA",action:"Validation",cible:"Livrable APS — Plans RDC v2",module:"Conception",crit:"Haute",result:"OK"},
];

// ═══════ PERMISSIONS MATRIX DATA ═══════
const PERM_ROLES=["Super Admin","Admin","SPOC","AMOA","MOE","MOEX","Client","Acheteur","Comptable","Fournisseur","SGI"];
const PERM_MODULES=["Vue globale","Utilisateurs","CRM / Prospects","Projets","Planning / Tâches","GED / Documents","Rapports chantier","Messagerie","Stocks chantier","Marketplace / Achats","Fournisseurs","Réceptions / Contrôle","Finance / Paiements","Audit & Logs","Paramétrage métier","Paramétrage CRM","Paramétrage projets","Météo chantier","Vidéosurveillance","Workflows","Sécurité & accès","Onboarding","KPI / Analytics","IA / Synthèse","Intégrations / API"];
const PERM_ACTIONS=["Voir","Créer","Modifier","Supprimer","Valider","Rejeter","Exporter","Affecter","Clôturer","Payer","Approuver DDC","Modif. param.","Données sensibles","Admin permissions","Voir audit","Automatisation","Notif.","Config. règles","Multi-projet"];
const getPermValue=(role,mod,act)=>{
  if(role==="Super Admin") return "full";
  if(role==="Admin"){if(act==="Approuver DDC"&&mod==="Finance / Paiements") return "double";return "full";}
  if(role==="Fournisseur"){if(["Marketplace / Achats","Fournisseurs","Réceptions / Contrôle"].includes(mod)&&["Voir","Créer","Modifier"].includes(act)) return "own";if(act==="Voir"&&mod==="Messagerie") return "own";return "none";}
  if(role==="Client"){if(act==="Voir"&&["Projets","GED / Documents","Finance / Paiements","Rapports chantier","Messagerie","KPI / Analytics"].includes(mod)) return "own";if(act==="Payer"&&mod==="Finance / Paiements") return "own";return "none";}
  if(role==="MOEX"){if(["Rapports chantier","Stocks chantier","Planning / Tâches"].includes(mod)&&["Voir","Créer","Modifier"].includes(act)) return "own";if(act==="Voir") return "own";return "none";}
  if(role==="MOE"){if(["Projets","GED / Documents","Planning / Tâches"].includes(mod)&&["Voir","Créer","Modifier"].includes(act)) return "own";if(act==="Voir") return "own";return "none";}
  if(role==="Acheteur"){if(["Marketplace / Achats","Fournisseurs","Réceptions / Contrôle","Stocks chantier"].includes(mod)&&["Voir","Créer","Modifier","Exporter"].includes(act)) return "full";if(act==="Voir") return "own";return "none";}
  if(role==="Comptable"){if(mod==="Finance / Paiements") return act==="Approuver DDC"?"double":"full";if(act==="Voir"||act==="Exporter") return "full";return "none";}
  if(role==="AMOA"){if(["Valider","Rejeter","Créer","Modifier","Voir","Exporter","Affecter"].includes(act)) return "own";return "none";}
  if(role==="SPOC"){if(["Admin permissions","Config. règles","Modif. param."].includes(act)) return "none";return "full";}
  if(role==="SGI") return "planned";
  return "none";
};

/* ═══════════════════════════════════════════════════════
   REUSABLE UI COMPONENTS
   ═══════════════════════════════════════════════════════ */
const Badge=({children,v="default",s="sm"})=>{const m={default:{b:C.primaryLight,c:C.primaryDark},success:{b:C.successLight,c:C.successDark},warning:{b:C.warningLight,c:C.warningDark},danger:{b:C.dangerLight,c:C.dangerDark},info:{b:C.infoLight,c:C.infoDark},purple:{b:C.purpleLight,c:C.purpleDark},dark:{b:"#F3F4F6",c:"#4B5563"},active:{b:C.secondaryLight,c:C.secondaryDark},critical:{b:"#7F1D1D",c:"#FEE2E2"}};const st=m[v]||m.default;return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:s==="xs"?"1px 6px":s==="lg"?"5px 14px":"3px 10px",borderRadius:20,fontSize:s==="xs"?10:s==="lg"?13:11,fontWeight:600,backgroundColor:st.b,color:st.c,letterSpacing:.3,whiteSpace:"nowrap"}}>{children}</span>};
const RoleBadge=({r})=>{const m={SPOC:"default",AMOA:"active",MOE:"purple",MOEX:"warning",Client:"info",Admin:"dark",Auto:"dark","Super Admin":"dark",Acheteur:"info",Comptable:"purple",Fournisseur:"warning",SGI:"dark"};return <Badge v={m[r]||"dark"}>{r}</Badge>};
const StatusBadge=({s})=>{const m={"Actif":"success","Inactif":"dark","En attente":"warning","En revue":"info","Converti":"success","Abandonné":"danger","Brouillon":"dark","En validation":"warning","Opérationnel":"success","Qualifié":"active","En onboarding":"info","Invité":"dark","Suspendu":"danger","Bon":"success","Attention":"warning","Critique":"danger","Faible":"success","Moyen":"warning","Élevé":"danger","Payé":"success","Payée":"success","Reçu":"success","Validé":"success","En attente validation":"warning","À rapprocher":"info","Livrée":"success","En transit":"info","Réceptionnée":"active"};return <Badge v={m[s]||"default"}>{s}</Badge>};
const ScoreBar=({value,max=100,h=6,label})=>{const p=Math.min(100,(value/max)*100);const cl=p>=80?C.success:p>=50?C.primary:p>=30?C.warning:C.danger;return <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:"#F3F4F6",borderRadius:h,height:h,overflow:"hidden",minWidth:50}}><div style={{width:`${p}%`,height:"100%",borderRadius:h,background:cl,transition:"width .4s"}}/></div>{label&&<span style={{fontSize:11,fontWeight:600,color:cl,minWidth:28,textAlign:"right"}}>{value}%</span>}</div>};
const KPI=({icon:I,label,value,sub,trend,color=C.primary,accent,onClick})=><div onClick={onClick} style={{background:"#fff",borderRadius:12,padding:"14px 16px",border:`1px solid ${C.border}`,flex:1,minWidth:140,display:"flex",flexDirection:"column",gap:5,cursor:onClick?"pointer":"default",borderLeft:accent?`3px solid ${accent}`:undefined,transition:"box-shadow .15s"}} onMouseEnter={e=>onClick&&(e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.06)")} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",background:`${color}12`}}><I size={15} color={color}/></div>{trend!==undefined&&<span style={{fontSize:10,fontWeight:600,display:"flex",alignItems:"center",gap:2,color:trend>=0?C.success:C.danger}}>{trend>=0?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{Math.abs(trend)}%</span>}</div><div style={{fontSize:18,fontWeight:800,color:C.dark,lineHeight:1.1}}>{value}</div><div style={{fontSize:10,color:C.gray,lineHeight:1.3}}>{label}</div>{sub&&<div style={{fontSize:9,color:C.lightGray}}>{sub}</div>}</div>;
const Card=({children,title,action,noPad,style:st})=><div style={{background:"#fff",borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden",...st}}>{title&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:`1px solid ${C.border}`}}><span style={{fontSize:13,fontWeight:700,color:C.dark}}>{title}</span>{action}</div>}{!noPad?<div style={{padding:title?"12px 16px":16}}>{children}</div>:children}</div>;
const Btn=({children,v="primary",icon:I,onClick,s="sm"})=>{const st={primary:{background:C.primary,color:"#fff",border:"none"},secondary:{background:C.bg,color:C.darkGray,border:`1px solid ${C.border}`},ghost:{background:"transparent",color:C.gray,border:"none"},danger:{background:C.danger,color:"#fff",border:"none"},outline:{background:"transparent",color:C.primary,border:`1px solid ${C.primary}`}};return <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:4,borderRadius:7,fontWeight:600,cursor:"pointer",fontSize:s==="xs"?10:12,padding:s==="xs"?"3px 7px":"5px 12px",transition:"opacity .12s",...st[v]}}>{I&&<I size={s==="xs"?11:13}/>}{children}</button>};
const Avatar=({name,role,sz=30})=>{const bg={SPOC:C.primaryLight,AMOA:C.secondaryLight,MOE:C.purpleLight,MOEX:C.warningLight,Client:C.infoLight,Admin:"#F3F4F6"}[role]||"#F3F4F6";const cl={SPOC:C.primaryDark,AMOA:C.secondaryDark,MOE:C.purpleDark,MOEX:C.warningDark,Client:C.infoDark,Admin:C.darkGray}[role]||C.darkGray;return <div style={{width:sz,height:sz,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*.38,fontWeight:700,color:cl,flexShrink:0}}>{name?.charAt(0)||"?"}</div>};
const TabBar=({tabs,active,onChange})=><div style={{display:"flex",gap:0,borderBottom:`2px solid ${C.border}`,marginBottom:14}}>{tabs.map(t=><button key={t.key} onClick={()=>onChange(t.key)} style={{padding:"8px 14px",fontSize:12,fontWeight:active===t.key?700:500,color:active===t.key?C.primary:C.gray,borderBottom:active===t.key?`2px solid ${C.primary}`:"2px solid transparent",background:"none",border:"none",cursor:"pointer",marginBottom:-2,display:"flex",alignItems:"center",gap:5}}>{t.label}{t.count!==undefined&&<span style={{fontSize:9,fontWeight:700,background:active===t.key?C.primaryLight:"#F3F4F6",color:active===t.key?C.primaryDark:C.gray,padding:"1px 6px",borderRadius:10}}>{t.count}</span>}</button>)}</div>;
const Dot=({color=C.success,sz=7})=><span style={{display:"inline-block",width:sz,height:sz,borderRadius:"50%",background:color,flexShrink:0}}/>;
const MiniTable=({cols,data,maxH,onRow})=><div style={{overflowX:"auto",maxHeight:maxH,overflowY:maxH?"auto":undefined}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr>{cols.map((c,i)=><th key={i} style={{padding:"7px 10px",textAlign:"left",fontWeight:600,color:C.gray,fontSize:10,letterSpacing:.5,textTransform:"uppercase",borderBottom:`1px solid ${C.border}`,background:C.bg,position:"sticky",top:0,zIndex:1}}>{c.label}</th>)}</tr></thead><tbody>{data.map((row,ri)=><tr key={ri} style={{borderBottom:`1px solid ${C.borderLight}`,cursor:onRow?"pointer":"default"}} onClick={()=>onRow?.(row)} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{cols.map((c,ci)=><td key={ci} style={{padding:"7px 10px",color:C.darkGray}}>{c.render?c.render(row):row[c.key]}</td>)}</tr>)}</tbody></table></div>;
const AlertRow=({icon:I,text,sub,sev="warning",time})=>{const cl={critical:C.danger,warning:C.warning,info:C.info,success:C.success}[sev]||C.warning;return <div style={{display:"flex",alignItems:"flex-start",gap:9,padding:"9px 0",borderBottom:`1px solid ${C.borderLight}`}}><div style={{width:26,height:26,borderRadius:7,background:`${cl}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><I size={13} color={cl}/></div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.dark}}>{text}</div>{sub&&<div style={{fontSize:10,color:C.gray,marginTop:1}}>{sub}</div>}</div>{time&&<span style={{fontSize:9,color:C.lightGray,whiteSpace:"nowrap"}}>{time}</span>}</div>};

/* ═══════════════════════════════════════════════════════
   DRAWER — reusable side panel
   ═══════════════════════════════════════════════════════ */
const Drawer=({title,onClose,width=480,children})=><div style={{position:"fixed",top:0,right:0,width,height:"100vh",background:"#fff",borderLeft:`1px solid ${C.border}`,zIndex:200,overflowY:"auto",boxShadow:"-4px 0 20px rgba(0,0,0,.1)"}}><div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bg,position:"sticky",top:0,zIndex:1}}><span style={{fontSize:14,fontWeight:700,color:C.dark}}>{title}</span><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={C.gray}/></button></div><div style={{padding:18,display:"flex",flexDirection:"column",gap:16}}>{children}</div></div>;

const InfoBlock=({label,value,sub})=><div><span style={{fontSize:10,color:C.gray,textTransform:"uppercase",letterSpacing:.5}}>{label}</span><div style={{fontSize:13,fontWeight:600,color:C.dark,marginTop:2}}>{value}</div>{sub&&<div style={{fontSize:10,color:C.lightGray}}>{sub}</div>}</div>;

/* ═══════════════════════════════════════════════════════
   1. VUE GLOBALE — Cockpit exécutif
   ═══════════════════════════════════════════════════════ */
const PageDashboard=({onNav,setDrawer})=>{
  const alerts=[
    {icon:AlertTriangle,text:"Stock critique : Câble 2.5mm² — 8 rouleaux (seuil 4)",sub:"PRJ-001 — Lot VII Électricité",sev:"warning",time:"08:30"},
    {icon:XCircle,text:"Caméra CAM-004 — flux RTSP interrompu 14h",sub:"PRJ-001 — Zone arrière non couverte",sev:"critical",time:"16/04"},
    {icon:CloudSun,text:"Alerte météo : pluie forte 19/04 Douala",sub:"Impact coffrage poteaux R+1",sev:"warning",time:"17/04"},
    {icon:Clock,text:"Prospect Cécile Ngono — 10j sans contact",sub:"Dernière action: envoi devis préliminaire",sev:"info",time:"08/04"},
    {icon:UserX,text:"Arc. Njoya (MOE) — adoption 45%, onboarding incomplet",sub:"3 modules non maîtrisés",sev:"warning",time:"15/04"},
  ];
  return <div style={{display:"flex",flexDirection:"column",gap:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Centre de Gouvernance</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Vue consolidée — 18 avril 2026</p></div><div style={{display:"flex",gap:6}}><Btn icon={Download} v="secondary">Export</Btn><Btn icon={RefreshCw} v="secondary">Rafraîchir</Btn></div></div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
      <KPI icon={Users} label="Prospects ce mois" value="7" sub="3 en attente · 2 en revue" trend={22} onClick={()=>onNav("prospects")}/>
      <KPI icon={Target} label="Taux conversion" value="43%" color={C.warning} trend={-5} onClick={()=>onNav("kpi")}/>
      <KPI icon={Building2} label="Projets actifs" value="3" sub="1 exéc · 1 devis · 1 préfais" color={C.secondary} onClick={()=>onNav("projets")}/>
      <KPI icon={DollarSign} label="CA Pipeline" value="230M" sub="FCFA" color={C.success} trend={12} onClick={()=>onNav("finance")}/>
      <KPI icon={AlertTriangle} label="Alertes actives" value="5" sub="1 critique · 3 warn · 1 info" color={C.danger} accent={C.danger} onClick={()=>setDrawer({type:"alerts",data:alerts})}/>
      <KPI icon={UserCheck} label="Utilisateurs actifs" value="8/10" sub="2 onboard · 1 inactif" color={C.info} onClick={()=>onNav("users")}/>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card title="Alertes & Actions urgentes" action={<Badge v="danger" s="xs">5</Badge>} noPad><div style={{padding:"2px 16px 12px"}}>{alerts.map((a,i)=><div key={i} style={{cursor:"pointer"}} onClick={()=>setDrawer({type:"alert-detail",data:a})}><AlertRow {...a}/></div>)}</div></Card>

      <Card title="Pipeline Prospects" action={<Btn v="ghost" s="xs" onClick={()=>onNav("prospects")}>Voir tout <ChevronRight size={11}/></Btn>}>
        <div style={{display:"flex",gap:8,marginBottom:12}}>{[{l:"En attente",c:2,cl:C.warning},{l:"En revue",c:3,cl:C.info},{l:"Convertis",c:1,cl:C.success},{l:"Abandonnés",c:1,cl:C.danger}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"8px 0",borderRadius:8,background:`${s.cl}08`,border:`1px solid ${s.cl}20`,cursor:"pointer"}} onClick={()=>onNav("prospects")}><div style={{fontSize:18,fontWeight:800,color:s.cl}}>{s.c}</div><div style={{fontSize:9,color:C.gray,marginTop:1}}>{s.l}</div></div>)}</div>
        <div style={{display:"flex",borderRadius:6,overflow:"hidden",height:8,marginBottom:8}}><div style={{width:"28%",background:C.warning}}/><div style={{width:"43%",background:C.info}}/><div style={{width:"15%",background:C.success}}/><div style={{width:"14%",background:C.danger}}/></div>
        <div style={{fontSize:10,color:C.gray}}>Pipeline: <strong style={{color:C.dark}}>578M FCFA</strong> · Cycle: <strong style={{color:C.dark}}>18j</strong></div>
      </Card>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
      <Card title="Projets en cours" action={<Btn v="ghost" s="xs" onClick={()=>onNav("projets")}>Tous <ChevronRight size={11}/></Btn>} noPad>
        <MiniTable cols={[
          {key:"nom",label:"Projet",render:r=><div style={{cursor:"pointer"}} onClick={()=>setDrawer({type:"project",data:r})}><div style={{fontWeight:600,color:C.dark,fontSize:11}}>{r.nom}</div><div style={{fontSize:9,color:C.gray}}>{r.client}</div></div>},
          {key:"phase",label:"Phase",render:r=><StatusBadge s={r.phase}/>},
          {key:"avt",label:"%",render:r=><ScoreBar value={r.avt} label/>},
          {key:"sante",label:"Santé",render:r=><StatusBadge s={r.sante}/>},
        ]} data={PROJECTS}/>
      </Card>

      <Card title="Finance / Paiements" action={<Btn v="ghost" s="xs" onClick={()=>onNav("finance")}>Détail <ChevronRight size={11}/></Btn>}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{textAlign:"center",padding:8,borderRadius:8,background:C.successLight}}><div style={{fontSize:16,fontWeight:800,color:C.successDark}}>45M</div><div style={{fontSize:9,color:C.successDark}}>Encaissé clients</div></div>
          <div style={{textAlign:"center",padding:8,borderRadius:8,background:C.warningLight}}><div style={{fontSize:16,fontWeight:800,color:C.warningDark}}>25.85M</div><div style={{fontSize:9,color:C.warningDark}}>Décaissé fournis.</div></div>
          <div style={{textAlign:"center",padding:8,borderRadius:8,background:C.infoLight}}><div style={{fontSize:16,fontWeight:800,color:C.infoDark}}>8.4M</div><div style={{fontSize:9,color:C.infoDark}}>En attente valid.</div></div>
          <div style={{textAlign:"center",padding:8,borderRadius:8,background:C.dangerLight}}><div style={{fontSize:16,fontWeight:800,color:C.dangerDark}}>1</div><div style={{fontSize:9,color:C.dangerDark}}>Anomalie rappro.</div></div>
        </div>
      </Card>

      <Card title="Utilisateurs à surveiller" action={<Btn v="ghost" s="xs" onClick={()=>onNav("users")}>Gérer <ChevronRight size={11}/></Btn>}>
        {USERS.filter(u=>u.adoption<60||u.statut==="Inactif"||u.incidents>0).slice(0,4).map((u,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer"}} onClick={()=>setDrawer({type:"user",data:u})}><Avatar name={u.nom} role={u.role} sz={26}/><div style={{flex:1}}><div style={{fontSize:11,fontWeight:600,color:C.dark}}>{u.nom}</div><div style={{fontSize:9,color:C.gray}}>{u.role} · {u.adoption}%</div></div>{u.incidents>0&&<Badge v="danger" s="xs">{u.incidents}</Badge>}</div>)}
      </Card>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:14}}>
      <Card title="Activité récente" action={<Btn v="ghost" s="xs" onClick={()=>onNav("audit")}>Journal <ChevronRight size={11}/></Btn>} noPad>
        <MiniTable cols={[
          {key:"date",label:"Date",render:r=><span style={{fontFamily:"monospace",fontSize:10,color:C.gray}}>{r.date}</span>},
          {key:"user",label:"Utilisateur",render:r=><span style={{fontWeight:600,fontSize:11}}>{r.user}</span>},
          {key:"role",label:"Rôle",render:r=><RoleBadge r={r.role}/>},
          {key:"action",label:"Action",render:r=><span style={{fontSize:11}}>{r.action}</span>},
          {key:"cible",label:"Objet",render:r=><span style={{fontSize:10,color:C.gray,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}>{r.cible}</span>},
        ]} data={AUDIT_LOGS.slice(0,6)} maxH={200}/>
      </Card>

      <Card style={{background:`linear-gradient(135deg,${C.dark},${C.dark2})`,borderColor:C.dark}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:30,height:30,borderRadius:8,background:`${C.primary}25`,display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={14} color={C.primary}/></div><div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Synthèse IA</div><div style={{fontSize:9,color:"rgba(255,255,255,.5)"}}>18/04/2026 09:00</div></div></div>
        {[
          {icon:CheckCircle2,text:"PRJ-001 conforme au planning. Jalon plancher R+1 le 25/04.",cl:C.success},
          {icon:AlertTriangle,text:"Prospect Cécile Ngono 10j sans contact — relance recommandée.",cl:C.warning},
          {icon:AlertCircle,text:"Arc. Njoya adoption 45% — onboarding GED + Planning recommandé.",cl:C.warning},
          {icon:TrendingDown,text:"Conversion -5% ce mois. 2 leads mal qualifiés (réseaux sociaux).",cl:C.danger},
          {icon:ShieldCheck,text:"Conformité: 94% rapports chantier soumis <24h. Objectif atteint.",cl:C.success},
        ].map((it,i)=><div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",cursor:"pointer"}} onClick={()=>setDrawer({type:"ia-detail",data:it})}><it.icon size={13} color={it.cl} style={{marginTop:2,flexShrink:0}}/><span style={{fontSize:11,color:"rgba(255,255,255,.85)",lineHeight:1.4}}>{it.text}</span></div>)}
      </Card>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   2. UTILISATEURS — Console d'administration complète
   ═══════════════════════════════════════════════════════ */
const PageUsers=({setDrawer})=>{
  const [tab,setTab]=useState("tous");
  const [view,setView]=useState("liste");
  const [search,setSearch]=useState("");
  const filtered=useMemo(()=>{
    let d=USERS;
    if(tab==="arisque") d=d.filter(u=>u.adoption<60||u.incidents>0||u.statut==="Inactif");
    else if(tab==="onboarding") d=d.filter(u=>["Invité","En onboarding"].includes(u.onboarding));
    else if(tab!=="tous") d=d.filter(u=>u.role.toLowerCase()===tab);
    if(search) d=d.filter(u=>u.nom.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()));
    return d;
  },[tab,search]);

  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Gestion des Utilisateurs</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Administration, qualification, habilitation, audit comptes</p></div><div style={{display:"flex",gap:6}}><Btn icon={Download} v="secondary">Export</Btn><Btn icon={Plus}>Nouvel utilisateur</Btn></div></div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
      <KPI icon={Users} label="Utilisateurs actifs" value="8" sub="sur 10 comptes" color={C.primary}/>
      <KPI icon={Users} label="SPOC" value="2" color={C.primary}/>
      <KPI icon={Briefcase} label="AMOA" value="2" color={C.secondary}/>
      <KPI icon={HardHat} label="MOE / MOEX" value="2" color={C.purple}/>
      <KPI icon={Home} label="Clients" value="3" color={C.info}/>
      <KPI icon={AlertTriangle} label="À surveiller" value="4" color={C.danger} accent={C.danger}/>
    </div>

    <Card title="Entonnoir d'onboarding"><div style={{display:"flex",gap:0}}>{[{l:"Invité",c:1,cl:C.lightGray},{l:"En onboarding",c:2,cl:C.info},{l:"Qualifié",c:2,cl:C.primary},{l:"Opérationnel",c:3,cl:C.success},{l:"Suspendu",c:1,cl:C.danger}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"10px 4px",position:"relative",background:`${s.cl}08`}}><div style={{fontSize:20,fontWeight:800,color:s.cl}}>{s.c}</div><div style={{fontSize:9,color:C.gray,marginTop:1}}>{s.l}</div>{i<4&&<ChevronRight size={14} color={C.faintGray} style={{position:"absolute",right:-7,top:"50%",transform:"translateY(-50%)",zIndex:1}}/>}</div>)}</div></Card>

    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:5,background:C.bg,borderRadius:7,padding:"5px 12px",border:`1px solid ${C.border}`,width:260}}><Search size={13} color={C.lightGray}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher nom, email…" style={{border:"none",background:"transparent",outline:"none",fontSize:12,color:C.darkGray,width:"100%"}}/></div>
      <Btn v={view==="liste"?"primary":"secondary"} s="xs" onClick={()=>setView("liste")}>Liste</Btn>
      <Btn v={view==="cartes"?"primary":"secondary"} s="xs" onClick={()=>setView("cartes")}>Cartes</Btn>
      <Btn v={view==="risques"?"primary":"secondary"} s="xs" onClick={()=>setView("risques")}>Risques</Btn>
    </div>

    <TabBar tabs={[
      {key:"tous",label:"Tous",count:USERS.length},
      {key:"arisque",label:"À surveiller",count:USERS.filter(u=>u.adoption<60||u.incidents>0||u.statut==="Inactif").length},
      {key:"onboarding",label:"Onboarding",count:USERS.filter(u=>["Invité","En onboarding"].includes(u.onboarding)).length},
      {key:"spoc",label:"SPOC",count:2},{key:"amoa",label:"AMOA",count:2},{key:"moe",label:"MOE",count:2},{key:"moex",label:"MOEX",count:1},{key:"client",label:"Clients",count:3},
    ]} active={tab} onChange={setTab}/>

    {view==="liste"&&<Card noPad><MiniTable cols={[
      {key:"nom",label:"Utilisateur",render:r=><div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setDrawer({type:"user",data:r})}><Avatar name={r.nom} role={r.role} sz={28}/><div><div style={{fontWeight:600,color:C.dark,fontSize:11}}>{r.nom}</div><div style={{fontSize:9,color:C.gray}}>{r.email}</div></div></div>},
      {key:"role",label:"Rôle",render:r=><div><RoleBadge r={r.role}/>{r.roles2.length>0&&<div style={{fontSize:8,color:C.lightGray}}>+{r.roles2.join(",")}</div>}</div>},
      {key:"projets",label:"Proj.",render:r=><span style={{fontWeight:600}}>{r.projets}</span>},
      {key:"statut",label:"Compte",render:r=><StatusBadge s={r.statut}/>},
      {key:"onboarding",label:"Onboarding",render:r=><StatusBadge s={r.onboarding}/>},
      {key:"maturite",label:"Maturité",render:r=><Badge v={{"Référent":"success","Confirmé":"active","Autonome":"info","Assisté":"warning","Découverte":"dark"}[r.maturite]||"dark"} s="xs">{r.maturite}</Badge>},
      {key:"adoption",label:"Adoption",render:r=><ScoreBar value={r.adoption} label/>},
      {key:"incidents",label:"Incid.",render:r=>r.incidents>0?<Badge v="danger" s="xs">{r.incidents}</Badge>:<span style={{color:C.lightGray}}>0</span>},
      {key:"conn",label:"Dern. cnx",render:r=><span style={{fontSize:9,fontFamily:"monospace",color:C.gray}}>{r.conn}</span>},
      {key:"_",label:"",render:r=><div style={{display:"flex",gap:3}}><button onClick={()=>setDrawer({type:"user",data:r})} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><Eye size={13} color={C.gray}/></button><button style={{background:"none",border:"none",cursor:"pointer",padding:2}}><Edit size={13} color={C.gray}/></button></div>},
    ]} data={filtered} onRow={r=>setDrawer({type:"user",data:r})}/></Card>}

    {view==="cartes"&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{filtered.map((u,i)=><div key={i} onClick={()=>setDrawer({type:"user",data:u})} style={{background:"#fff",borderRadius:10,padding:14,border:`1px solid ${C.border}`,cursor:"pointer",borderLeft:`3px solid ${u.adoption>=80?C.success:u.adoption>=50?C.primary:u.adoption>=30?C.warning:C.danger}`}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><Avatar name={u.nom} role={u.role} sz={36}/><div><div style={{fontSize:13,fontWeight:700,color:C.dark}}>{u.nom}</div><div style={{fontSize:10,color:C.gray}}>{u.email}</div></div></div><div style={{display:"flex",gap:4,marginBottom:8}}><RoleBadge r={u.role}/><StatusBadge s={u.statut}/><StatusBadge s={u.onboarding}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,textAlign:"center"}}><div><div style={{fontSize:14,fontWeight:700,color:C.dark}}>{u.projets}</div><div style={{fontSize:8,color:C.gray}}>Projets</div></div><div><div style={{fontSize:14,fontWeight:700,color:C.dark}}>{u.actions7j}</div><div style={{fontSize:8,color:C.gray}}>Actions 7j</div></div><div><ScoreBar value={u.adoption} label/><div style={{fontSize:8,color:C.gray}}>Adoption</div></div></div></div>)}</div>}

    {view==="risques"&&<Card noPad><MiniTable cols={[
      {key:"nom",label:"Utilisateur",render:r=><div style={{display:"flex",alignItems:"center",gap:8}}><Avatar name={r.nom} role={r.role} sz={26}/><span style={{fontWeight:600,fontSize:11,color:C.dark}}>{r.nom}</span></div>},
      {key:"role",label:"Rôle",render:r=><RoleBadge r={r.role}/>},
      {key:"adoption",label:"Adoption",render:r=><ScoreBar value={r.adoption} label/>},
      {key:"incidents",label:"Incidents",render:r=>r.incidents>0?<Badge v="danger" s="xs">{r.incidents}</Badge>:<Dot color={C.success}/>},
      {key:"modulesWeak",label:"Modules faibles",render:r=>r.modulesWeak.length>0?<div style={{display:"flex",flexWrap:"wrap",gap:2}}>{r.modulesWeak.slice(0,3).map((m,i)=><Badge key={i} v="warning" s="xs">{m}</Badge>)}</div>:<span style={{fontSize:10,color:C.lightGray}}>RAS</span>},
      {key:"risque",label:"Niveau",render:r=>{const sc=r.adoption<30?"Critique":r.adoption<50?"Élevé":r.adoption<70?"Moyen":"Faible";return <StatusBadge s={sc}/>}},
    ]} data={USERS.sort((a,b)=>a.adoption-b.adoption)} onRow={r=>setDrawer({type:"user",data:r})}/></Card>}
  </div>;
};

/* ═══════════════════════════════════════════════════════
   3. MATRICE DES PERMISSIONS
   ═══════════════════════════════════════════════════════ */
const PagePermissions=({setDrawer})=>{
  const [filterRole,setFilterRole]=useState("Tous");
  const [filterModule,setFilterModule]=useState("Tous");
  const [filterSensitive,setFilterSensitive]=useState(false);
  const [compareMode,setCompareMode]=useState(false);
  const [compare1,setCompare1]=useState("SPOC");
  const [compare2,setCompare2]=useState("AMOA");

  const cellStyle=(val)=>({
    width:20,height:20,borderRadius:4,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,cursor:"pointer",
    background:val==="full"?C.successLight:val==="own"?C.infoLight:val==="double"?C.warningLight:val==="planned"?"#F3F4F6":"#FAFAFA",
    color:val==="full"?C.successDark:val==="own"?C.infoDark:val==="double"?C.warningDark:val==="planned"?C.lightGray:C.faintGray,
    border:`1px solid ${val==="full"?C.success+"40":val==="own"?C.info+"40":val==="double"?C.warning+"40":"#E5E7EB"}`
  });
  const cellIcon=(val)=>{if(val==="full")return"✓";if(val==="own")return"◐";if(val==="double")return"⇄";if(val==="planned")return"◷";return"—"};

  const rolesToShow=filterRole==="Tous"?PERM_ROLES:PERM_ROLES.filter(r=>r===filterRole);
  const modsToShow=filterModule==="Tous"?PERM_MODULES:PERM_MODULES.filter(m=>m===filterModule);
  const sensitiveActions=["Approuver DDC","Admin permissions","Données sensibles","Modif. param.","Config. règles","Supprimer"];

  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Matrice des Permissions</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>{PERM_ROLES.length} rôles × {PERM_MODULES.length} modules × {PERM_ACTIONS.length} actions</p></div><div style={{display:"flex",gap:6}}><Btn v={compareMode?"primary":"secondary"} s="xs" onClick={()=>setCompareMode(!compareMode)} icon={Table2}>Comparer rôles</Btn><Btn icon={Download} v="secondary" s="xs">Export</Btn></div></div>

    <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
      <span style={{fontSize:11,fontWeight:600,color:C.gray}}>Filtres:</span>
      <select value={filterRole} onChange={e=>setFilterRole(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:11}}><option>Tous</option>{PERM_ROLES.map(r=><option key={r}>{r}</option>)}</select>
      <select value={filterModule} onChange={e=>setFilterModule(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:11}}><option>Tous</option>{PERM_MODULES.map(m=><option key={m}>{m}</option>)}</select>
      <label style={{fontSize:11,display:"flex",alignItems:"center",gap:4,color:C.gray,cursor:"pointer"}}><input type="checkbox" checked={filterSensitive} onChange={e=>setFilterSensitive(e.target.checked)}/> Permissions sensibles uniquement</label>
      <div style={{marginLeft:"auto",display:"flex",gap:6,fontSize:10}}>
        {[{v:"full",l:"Complet",cl:C.success},{v:"own",l:"Périmètre propre",cl:C.info},{v:"double",l:"Double valid.",cl:C.warning},{v:"planned",l:"Prévu",cl:C.lightGray},{v:"none",l:"Aucun",cl:C.faintGray}].map((leg,i)=><span key={i} style={{display:"flex",alignItems:"center",gap:3}}><span style={{...cellStyle(leg.v),width:14,height:14,fontSize:7}}>{cellIcon(leg.v)}</span>{leg.l}</span>)}
      </div>
    </div>

    {!compareMode&&<Card noPad><div style={{overflowX:"auto",maxHeight:500,overflowY:"auto"}}><table style={{borderCollapse:"collapse",fontSize:10,width:"100%"}}><thead><tr><th style={{padding:"6px 8px",position:"sticky",top:0,left:0,zIndex:3,background:C.bg,borderBottom:`1px solid ${C.border}`,textAlign:"left",fontSize:9,fontWeight:700,color:C.gray,minWidth:160}}>Module / Action</th>{rolesToShow.map(r=><th key={r} colSpan={1} style={{padding:"6px 4px",position:"sticky",top:0,zIndex:2,background:C.bg,borderBottom:`1px solid ${C.border}`,textAlign:"center",fontSize:9,fontWeight:700,color:C.dark,minWidth:50,writingMode:"vertical-rl",transform:"rotate(180deg)",height:80}}>{r}</th>)}</tr></thead><tbody>
      {modsToShow.map(mod=>{
        const actionsToShow=filterSensitive?PERM_ACTIONS.filter(a=>sensitiveActions.includes(a)):PERM_ACTIONS;
        return actionsToShow.map((act,ai)=><tr key={`${mod}-${act}`} style={{borderBottom:ai===actionsToShow.length-1?`2px solid ${C.border}`:`1px solid ${C.borderLight}`}}>
          <td style={{padding:"4px 8px",position:"sticky",left:0,background:"#fff",zIndex:1}}>{ai===0&&<div style={{fontWeight:700,color:C.dark,fontSize:11,marginBottom:2}}>{mod}</div>}<span style={{color:C.gray,fontSize:10,paddingLeft:ai===0?0:10}}>{act}{sensitiveActions.includes(act)&&<span style={{color:C.danger}}> ●</span>}</span></td>
          {rolesToShow.map(role=>{const val=getPermValue(role,mod,act);return <td key={role} style={{textAlign:"center",padding:"3px 2px"}}><span style={cellStyle(val)} onClick={()=>setDrawer({type:"permission",data:{role,mod,act,val}})} title={`${role} · ${mod} · ${act} → ${val}`}>{cellIcon(val)}</span></td>})}
        </tr>)
      })}
    </tbody></table></div></Card>}

    {compareMode&&<Card title={`Comparaison: ${compare1} vs ${compare2}`}>
      <div style={{display:"flex",gap:8,marginBottom:12}}><select value={compare1} onChange={e=>setCompare1(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:11}}>{PERM_ROLES.map(r=><option key={r}>{r}</option>)}</select><span style={{fontSize:12,color:C.gray}}>vs</span><select value={compare2} onChange={e=>setCompare2(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:11}}>{PERM_ROLES.map(r=><option key={r}>{r}</option>)}</select></div>
      <div style={{overflowX:"auto",maxHeight:400,overflowY:"auto"}}><table style={{borderCollapse:"collapse",fontSize:10,width:"100%"}}><thead><tr><th style={{padding:"5px 8px",background:C.bg,textAlign:"left",fontSize:9,fontWeight:700,color:C.gray}}>Module</th><th style={{padding:"5px 8px",background:C.bg,textAlign:"left",fontSize:9}}>Action</th><th style={{padding:"5px 8px",background:C.bg,textAlign:"center",fontSize:9}}>{compare1}</th><th style={{padding:"5px 8px",background:C.bg,textAlign:"center",fontSize:9}}>{compare2}</th><th style={{padding:"5px 8px",background:C.bg,textAlign:"center",fontSize:9}}>Diff?</th></tr></thead><tbody>{PERM_MODULES.slice(0,12).map(mod=>PERM_ACTIONS.slice(0,8).map((act,ai)=>{const v1=getPermValue(compare1,mod,act),v2=getPermValue(compare2,mod,act);const diff=v1!==v2;return <tr key={`${mod}-${act}`} style={{borderBottom:`1px solid ${C.borderLight}`,background:diff?C.warningLight+"30":"transparent"}}><td style={{padding:"3px 8px"}}>{ai===0?<span style={{fontWeight:600,color:C.dark}}>{mod}</span>:""}</td><td style={{padding:"3px 8px",color:C.gray}}>{act}</td><td style={{textAlign:"center"}}><span style={cellStyle(v1)}>{cellIcon(v1)}</span></td><td style={{textAlign:"center"}}><span style={cellStyle(v2)}>{cellIcon(v2)}</span></td><td style={{textAlign:"center"}}>{diff?<Badge v="warning" s="xs">Diff</Badge>:<Dot color={C.success} sz={6}/>}</td></tr>}))}</tbody></table></div>
    </Card>}
  </div>;
};

/* ═══════════════════════════════════════════════════════
   4. CRM ADMIN
   ═══════════════════════════════════════════════════════ */
const PageCRM=({setDrawer})=>{
  const [view,setView]=useState("liste");
  const KanbanCol=({title,items,cl})=><div style={{flex:1,minWidth:200}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><Dot color={cl} sz={8}/><span style={{fontSize:11,fontWeight:700,color:C.dark}}>{title}</span><Badge v="dark" s="xs">{items.length}</Badge></div>{items.map((p,i)=><div key={i} onClick={()=>setDrawer({type:"prospect",data:p})} style={{background:"#fff",borderRadius:8,padding:10,border:`1px solid ${C.border}`,borderLeft:`3px solid ${cl}`,marginBottom:6,cursor:"pointer"}}><div style={{fontSize:11,fontWeight:700,color:C.dark}}>{p.nom}</div><div style={{fontSize:9,color:C.gray}}>{p.type} · {p.region}</div><div style={{display:"flex",justifyContent:"space-between",marginTop:6}}><span style={{fontSize:10,fontWeight:600}}>{p.budget}</span><ScoreBar value={p.score} label/></div><div style={{fontSize:9,color:p.delai>7?C.danger:C.lightGray,marginTop:4}}>{p.spoc} · {p.delai>0?`${p.delai}j sans contact`:"Aujourd'hui"}</div></div>)}</div>;

  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>CRM — Vue Admin</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Pipeline, affectations, qualité</p></div><div style={{display:"flex",gap:6}}><Btn v={view==="liste"?"primary":"secondary"} s="xs" onClick={()=>setView("liste")}>Liste</Btn><Btn v={view==="kanban"?"primary":"secondary"} s="xs" onClick={()=>setView("kanban")}>Kanban</Btn><Btn v={view==="stats"?"primary":"secondary"} s="xs" onClick={()=>setView("stats")}>Stats</Btn></div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}><KPI icon={Users} label="Total prospects" value="7" trend={22}/><KPI icon={Target} label="Taux conversion" value="14%" color={C.warning}/><KPI icon={DollarSign} label="Pipeline" value="578M" color={C.success}/><KPI icon={Clock} label="Cycle moyen" value="18j" color={C.info}/><KPI icon={AlertTriangle} label="Stagnants" value="2" color={C.danger} accent={C.danger}/><KPI icon={FileWarning} label="Qual. remplissage" value="76%" color={C.purple}/></div>
    <Card title="Anomalies CRM" action={<Badge v="warning" s="xs">3</Badge>}><AlertRow icon={UserX} text="Franck Mbarga — pas de SPOC affecté" sub="Source: Réseaux sociaux · Qualité: 45%" sev="critical"/><AlertRow icon={Clock} text="Cécile Ngono — 10j sans contact" sub="SPOC: Marie Atangana" sev="warning"/><AlertRow icon={AlertCircle} text="Hélène Mbouda — abandonnée après 3 relances" sub="21j sans réponse" sev="info"/></Card>

    {view==="liste"&&<Card noPad><MiniTable cols={[
      {key:"id",label:"Réf",render:r=><span style={{fontSize:9,fontFamily:"monospace",color:C.gray}}>{r.id}</span>},
      {key:"nom",label:"Prospect",render:r=><span style={{fontWeight:600,color:C.dark,fontSize:11,cursor:"pointer"}} onClick={()=>setDrawer({type:"prospect",data:r})}>{r.nom}</span>},
      {key:"type",label:"Type",render:r=><span style={{fontSize:10}}>{r.type}</span>},
      {key:"region",label:"Ville"},{key:"budget",label:"Budget",render:r=><span style={{fontWeight:600,fontSize:11}}>{r.budget}</span>},
      {key:"statut",label:"Statut",render:r=><StatusBadge s={r.statut}/>},
      {key:"score",label:"Score",render:r=><ScoreBar value={r.score} label/>},
      {key:"spoc",label:"SPOC",render:r=>r.spoc==="—"?<Badge v="danger" s="xs">Non affecté</Badge>:<span style={{fontSize:10}}>{r.spoc}</span>},
      {key:"qualFiche",label:"Qual.",render:r=><ScoreBar value={r.qualFiche} label/>},
      {key:"delai",label:"Contact",render:r=><span style={{fontSize:10,color:r.delai>7?C.danger:C.gray}}>{r.delai===0?"Auj.":`${r.delai}j`}</span>},
    ]} data={PROSPECTS} onRow={r=>setDrawer({type:"prospect",data:r})}/></Card>}

    {view==="kanban"&&<div style={{display:"flex",gap:12,overflowX:"auto"}}><KanbanCol title="En attente" items={PROSPECTS.filter(p=>p.statut==="En attente")} cl={C.warning}/><KanbanCol title="En revue" items={PROSPECTS.filter(p=>p.statut==="En revue")} cl={C.info}/><KanbanCol title="Convertis" items={PROSPECTS.filter(p=>p.statut==="Converti")} cl={C.success}/><KanbanCol title="Abandonnés" items={PROSPECTS.filter(p=>p.statut==="Abandonné")} cl={C.danger}/></div>}

    {view==="stats"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card title="Par source">{[{s:"Site web",c:3},{s:"Recommandation",c:1},{s:"Événement diaspora",c:1},{s:"Réseaux sociaux",c:1},{s:"Partenaire Connect",c:1}].map((x,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${C.borderLight}`}}><span style={{fontSize:11,flex:1}}>{x.s}</span><span style={{fontSize:11,fontWeight:700}}>{x.c}</span><div style={{width:60}}><ScoreBar value={x.c*14}/></div></div>)}</Card>
      <Card title="Performance SPOC">{[{n:"Marie Atangana",l:4,conv:"25%",q:92},{n:"F. Nkoulou",l:2,conv:"0%",q:68},{n:"Non affecté",l:1,conv:"—",q:45}].map((x,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${C.borderLight}`}}><Avatar name={x.n} role="SPOC" sz={26}/><div style={{flex:1}}><div style={{fontSize:11,fontWeight:600,color:C.dark}}>{x.n}</div><div style={{fontSize:9,color:C.gray}}>{x.l} leads · Conv: {x.conv}</div></div><ScoreBar value={x.q} label/></div>)}</Card>
    </div>}
  </div>;
};

/* ═══════════════════════════════════════════════════════
   5. PROJETS
   ═══════════════════════════════════════════════════════ */
const PageProjects=({setDrawer})=><div style={{display:"flex",flexDirection:"column",gap:16}}>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Portefeuille Projets</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Vision consolidée</p></div><div style={{display:"flex",gap:6}}><Btn icon={Filter} v="secondary">Filtres</Btn><Btn icon={Download} v="secondary">Export</Btn></div></div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}><KPI icon={Building2} label="Projets actifs" value="3"/><KPI icon={DollarSign} label="Budget total" value="230M" color={C.success}/><KPI icon={DollarSign} label="Dépensé" value="54.9M" sub="24%" color={C.warning}/><KPI icon={AlertTriangle} label="Alertes" value="3" color={C.danger} accent={C.danger}/><KPI icon={Clock} label="Valid. en attente" value="4" color={C.info}/></div>
  <Card title="Répartition par phase"><div style={{display:"flex",gap:8}}>{[{p:"Pré-faisabilité",c:1,cl:C.lightGray},{p:"Devis",c:1,cl:C.info},{p:"Exécution",c:1,cl:C.success},{p:"Clos",c:0,cl:C.dark}].map((x,i)=><div key={i} style={{flex:1,textAlign:"center",padding:10,borderRadius:8,background:`${x.cl}08`,border:`1px solid ${x.cl}20`}}><div style={{fontSize:20,fontWeight:800,color:x.cl}}>{x.c}</div><div style={{fontSize:10,color:C.gray}}>{x.p}</div></div>)}</div></Card>
  {PROJECTS.map((p,i)=><div key={i} onClick={()=>setDrawer({type:"project",data:p})} style={{background:"#fff",borderRadius:12,padding:16,border:`1px solid ${C.border}`,borderLeft:`4px solid ${p.sante==="Bon"?C.success:p.sante==="Attention"?C.warning:C.lightGray}`,cursor:"pointer",transition:"box-shadow .15s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.05)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
    <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:9,fontFamily:"monospace",color:C.gray}}>{p.id}</span><span style={{fontSize:14,fontWeight:700,color:C.dark}}>{p.nom}</span></div><div style={{fontSize:10,color:C.gray,marginTop:3}}>{p.client} · {p.type} · {p.ville} · SPOC: {p.spoc}</div></div><div style={{display:"flex",gap:4}}><StatusBadge s={p.phase}/><StatusBadge s={p.sante}/></div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:12,marginTop:12}}><div><div style={{fontSize:9,color:C.gray}}>Avancement</div><ScoreBar value={p.avt} label/></div><div><div style={{fontSize:9,color:C.gray}}>Budget</div><div style={{fontSize:12,fontWeight:700,color:C.dark}}>{(p.budget/1e6).toFixed(0)}M</div></div><div><div style={{fontSize:9,color:C.gray}}>Dépensé</div><div style={{fontSize:12,fontWeight:700,color:C.dark}}>{(p.dep/1e6).toFixed(1)}M ({Math.round(p.dep/p.budget*100)}%)</div></div><div><div style={{fontSize:9,color:C.gray}}>Prochain jalon</div><div style={{fontSize:10,color:C.dark}}>{p.jalon}</div></div><div><div style={{fontSize:9,color:C.gray}}>Alertes</div><div style={{display:"flex",gap:3,marginTop:2}}>{p.alertes>0&&<Badge v="danger" s="xs">{p.alertes}</Badge>}{p.validPend>0&&<Badge v="warning" s="xs">{p.validPend} valid.</Badge>}{!p.alertes&&!p.validPend&&<span style={{color:C.lightGray,fontSize:10}}>RAS</span>}</div></div></div>
  </div>)}
</div>;

/* ═══════════════════════════════════════════════════════
   6. PARAMÉTRAGE
   ═══════════════════════════════════════════════════════ */
const PageParametrage=({setDrawer})=>{
  const [sec,setSec]=useState("ref");
  const sections=[
    {key:"ref",label:"Référentiels métier",icon:Database,items:[{t:"Articles & Matériaux",d:"Base centralisée",c:"156 articles",cl:C.primary},{t:"Lots standards",d:"Templates par type",c:"9 lots",cl:C.primary},{t:"Typologies projet",d:"Villa, Duplex, Immeuble…",c:"6 types",cl:C.primary},{t:"Niveaux de finition",d:"Base, Moyenne, Haut de gamme",c:"3 niveaux",cl:C.primary},{t:"Corps d'état / Main d'œuvre",d:"Métiers, niveaux, coûts/jour",c:"18 postes",cl:C.primary},{t:"Fournisseurs référencés",d:"Prestataires avec KPI",c:"23 fournisseurs",cl:C.primary},{t:"Documents requis par étape",d:"Livrables obligatoires",c:"34 documents",cl:C.primary},{t:"Seuils métier",d:"Seuils stock, qualité, délais",c:"12 seuils",cl:C.primary}]},
    {key:"crm",label:"Paramétrage CRM",icon:Users,items:[{t:"Champs formulaire",d:"Définition champs + règles",c:"12 champs",cl:C.info},{t:"Règles conditionnelles",d:"Affichage dynamique",c:"8 règles",cl:C.info},{t:"Scoring prospects",d:"Pondération automatique",c:"8 critères",cl:C.info},{t:"Statuts pipeline",d:"Étapes commerciales",c:"5 statuts",cl:C.info},{t:"Affectation SPOC",d:"Règles auto par zone/type",c:"4 règles",cl:C.info},{t:"SLA & relances",d:"Délais max, relances auto",c:"6 SLA",cl:C.info},{t:"Mapping Odoo CRM",d:"Synchronisation champs",c:"15 mappings",cl:C.info}]},
    {key:"proj",label:"Paramétrage projets",icon:Building2,items:[{t:"Templates planning",d:"Modèles par type construction",c:"4 modèles",cl:C.secondary},{t:"Jalons standards",d:"Jalons obligatoires par phase",c:"12 jalons",cl:C.secondary},{t:"Phases projet",d:"Préfais → Exéc → Clos",c:"5 phases",cl:C.secondary},{t:"Tâches types",d:"Bibliothèque tâches",c:"48 tâches",cl:C.secondary},{t:"Dépendances",d:"Liens entre tâches",c:"32 liens",cl:C.secondary},{t:"Règles de passage",d:"Conditions inter-phases",c:"8 règles",cl:C.secondary},{t:"Règles de validation",d:"Circuits approbation",c:"15 circuits",cl:C.secondary},{t:"Blocages configurables",d:"Conditions d'arrêt",c:"6 blocages",cl:C.secondary}]},
    {key:"meteo",label:"Météo chantier",icon:CloudSun,items:[{t:"Seuils par tâche",d:"Conditions météo limitant exécution",c:"4 seuils",cl:C.warning},{t:"Impacts chantier",d:"Matrice impact / tâche",c:"12 combinaisons",cl:C.warning},{t:"Scénarios arrêt/reprise",d:"Automatiques ou manuels",c:"6 scénarios",cl:C.warning},{t:"Liens avec planning",d:"Recalcul automatique",c:"Actif",cl:C.warning}]},
    {key:"video",label:"Vidéosurveillance",icon:Camera,items:[{t:"Caméras RTSP",d:"Config flux par chantier",c:"4 caméras",cl:C.purple},{t:"Zones surveillées",d:"Délimitation, nommage",c:"6 zones",cl:C.purple},{t:"Plages horaires",d:"Heures enregistrement",c:"2 plages",cl:C.purple},{t:"Détection mouvement",d:"Alertes hors heures",c:"3 règles",cl:C.purple},{t:"Conservation vidéo",d:"Durée rétention",c:"30 jours",cl:C.purple},{t:"Preuves vidéo",d:"Export sécurisé pour audit",c:"Actif",cl:C.purple}]},
    {key:"wf",label:"Workflows & Notifications",icon:Send,items:[{t:"Circuits de validation",d:"Qui valide quoi",c:"18 workflows",cl:C.primary},{t:"Escalades",d:"Délais et destinataires",c:"6 règles",cl:C.primary},{t:"Canaux",d:"Email, SMS, Push, In-app",c:"4 canaux",cl:C.primary},{t:"Modèles de message",d:"Templates notifications",c:"24 modèles",cl:C.primary},{t:"SLA workflows",d:"Délais max par action",c:"12 SLA",cl:C.primary},{t:"Journal des envois",d:"Historique notifications",c:"Log actif",cl:C.primary}]},
    {key:"sec",label:"Sécurité & Accès",icon:Shield,items:[{t:"Rôles",d:"Admin, SPOC, AMOA, MOE…",c:"11 rôles",cl:C.danger},{t:"Permissions",d:"Matrice de droits",c:"72 perms",cl:C.danger},{t:"Habilitations sensibles",d:"Actions nécessitant validation",c:"8 actions",cl:C.danger},{t:"Restrictions module",d:"Accès conditionnel",c:"Actif",cl:C.danger},{t:"MFA / 2FA",d:"Authentification renforcée",c:"Optionnel",cl:C.danger},{t:"Sessions actives",d:"Surveillance connexions",c:"Temps réel",cl:C.danger},{t:"Journal des droits",d:"Historique modifications",c:"Log actif",cl:C.danger}]},
    {key:"onb",label:"Onboarding & Qualification",icon:GraduationCap,items:[{t:"Parcours par rôle",d:"Étapes adaptées",c:"6 parcours",cl:C.success},{t:"Modules obligatoires",d:"Formations requises",c:"12 modules",cl:C.success},{t:"Quiz & Checklists",d:"Validations prise en main",c:"8 quiz",cl:C.success},{t:"Niveaux qualification",d:"Découverte → Référent",c:"5 niveaux",cl:C.success},{t:"Règles de montée",d:"Conditions évolution",c:"10 règles",cl:C.success},{t:"Seuils alerte usage",d:"Usage insuffisant détecté",c:"Actif",cl:C.success}]},
    {key:"sys",label:"Système & Intégrations",icon:Zap,items:[{t:"Odoo CRM / Facturation",d:"Sync bidirectionnelle",c:"Actif",cl:C.darkGray},{t:"Connect (paiement)",d:"API transferts",c:"Actif",cl:C.darkGray},{t:"Firebase Push",d:"Notifications mobile",c:"Actif",cl:C.darkGray},{t:"SMTP / Email",d:"Transactionnel",c:"Actif",cl:C.darkGray},{t:"Jours ouvrés / Fériés",d:"Calendrier configurable",c:"Cameroun",cl:C.darkGray},{t:"Devises & Taux",d:"FCFA, EUR",c:"2 devises",cl:C.darkGray},{t:"Logs techniques",d:"Erreurs API",c:"En temps réel",cl:C.darkGray}]},
  ];
  const active=sections.find(s=>s.key===sec);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Centre de Paramétrage</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Configuration et référentiels structurants</p></div>
    <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:14}}>
      <div style={{display:"flex",flexDirection:"column",gap:2}}>{sections.map(s=><button key={s.key} onClick={()=>setSec(s.key)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:7,background:sec===s.key?C.primaryLight:"transparent",color:sec===s.key?C.primaryDark:C.gray,border:"none",cursor:"pointer",fontSize:11,fontWeight:sec===s.key?700:500,textAlign:"left",width:"100%"}}><s.icon size={14}/>{s.label}</button>)}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{active?.items.map((it,i)=><div key={i} onClick={()=>setDrawer({type:"param-detail",data:it})} style={{background:"#fff",borderRadius:9,padding:14,border:`1px solid ${C.border}`,cursor:"pointer",display:"flex",alignItems:"flex-start",gap:10,transition:"box-shadow .15s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,.04)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}><div style={{width:34,height:34,borderRadius:8,background:`${it.cl}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Settings size={14} color={it.cl}/></div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.dark}}>{it.t}</div><div style={{fontSize:10,color:C.gray,marginTop:2}}>{it.d}</div><div style={{fontSize:9,color:C.lightGray,marginTop:3}}>{it.c}</div></div><ChevronRight size={13} color={C.lightGray}/></div>)}</div>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   7. FINANCE / DÉCAISSEMENTS / PAIEMENTS
   ═══════════════════════════════════════════════════════ */
const PageFinance=({setDrawer})=>{
  const [tab,setTab]=useState("tous");
  const filtered=useMemo(()=>{
    if(tab==="tous") return FINANCE_DATA;
    return FINANCE_DATA.filter(f=>f.type.toLowerCase().includes(tab));
  },[tab]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Finance, Paiements & Décaissements</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Traçabilité financière complète</p></div><Btn icon={Download} v="secondary">Export</Btn></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
      <KPI icon={Banknote} label="Encaissé clients" value="45M" sub="FCFA" color={C.success} trend={15}/>
      <KPI icon={DollarSign} label="Décaissé total" value="25.85M" sub="FCFA" color={C.warning}/>
      <KPI icon={Clock} label="En attente valid." value="8.4M" sub="1 demande" color={C.info}/>
      <KPI icon={FileSpreadsheet} label="Factures émises" value="4" color={C.primary}/>
      <KPI icon={AlertTriangle} label="Anomalies rappro." value="1" sub="FAC fournisseur" color={C.danger} accent={C.danger}/>
      <KPI icon={Receipt} label="Solde client PRJ-001" value="+12.15M" sub="Excédent séquestre" color={C.success}/>
    </div>
    <TabBar tabs={[{key:"tous",label:"Toutes opérations",count:FINANCE_DATA.length},{key:"décaissement",label:"Décaissements",count:3},{key:"facture client",label:"Factures client",count:3},{key:"facture fournisseur",label:"Factures fournisseur",count:1},{key:"paiement",label:"Paiements reçus",count:2}]} active={tab} onChange={setTab}/>
    <Card noPad><MiniTable cols={[
      {key:"id",label:"Réf",render:r=><span style={{fontSize:9,fontFamily:"monospace",color:C.gray}}>{r.id}</span>},
      {key:"type",label:"Type",render:r=><Badge v={r.type.includes("Décaissement")?"warning":r.type.includes("Paiement")?"success":r.type.includes("fournisseur")?"purple":"info"} s="xs">{r.type}</Badge>},
      {key:"projet",label:"Projet"},{key:"objet",label:"Objet",render:r=><span style={{fontSize:10,maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}>{r.objet}</span>},
      {key:"montant",label:"Montant",render:r=><span style={{fontWeight:700,fontSize:11,color:C.dark}}>{(r.montant/1e6).toFixed(2)}M</span>},
      {key:"statut",label:"Statut",render:r=><StatusBadge s={r.statut}/>},
      {key:"demandeur",label:"Demandeur",render:r=><span style={{fontSize:10}}>{r.demandeur}</span>},
      {key:"valideur",label:"Valideur",render:r=><span style={{fontSize:10}}>{r.valideur||"—"}</span>},
      {key:"date",label:"Date",render:r=><span style={{fontSize:9,color:C.gray}}>{r.date}</span>},
      {key:"pieces",label:"PJ",render:r=><Badge v="dark" s="xs">{r.pieces}</Badge>},
    ]} data={filtered} onRow={r=>setDrawer({type:"finance",data:r})}/></Card>
    <Card title="Rapprochement Commande → Réception → Facture → Paiement">
      <MiniTable cols={[
        {key:"cmd",label:"Commande",render:()=><Badge v="info" s="xs">CMD-001</Badge>},
        {key:"fourni",label:"Fournisseur",render:()=>"SOCATRAL"},
        {key:"montantCmd",label:"Montant cmd",render:()=><span style={{fontWeight:600}}>4.45M</span>},
        {key:"reception",label:"Réception",render:()=><Badge v="success" s="xs">Livrée 08/04</Badge>},
        {key:"facture",label:"Facture fourni.",render:()=><Badge v="info" s="xs">FAC-004 (5.85M)</Badge>},
        {key:"ecart",label:"Écart",render:()=><span style={{color:C.danger,fontWeight:600}}>+1.4M (31%)</span>},
        {key:"statut",label:"Statut",render:()=><Badge v="warning" s="xs">À rapprocher</Badge>},
      ]} data={[{}]}/>
      <div style={{marginTop:8,fontSize:10,color:C.danger,fontWeight:600}}>⚠ Écart significatif entre commande (4.45M) et facture fournisseur (5.85M) — investigation requise</div>
    </Card>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   8. MARKETPLACE / APPRO CHANTIER
   ═══════════════════════════════════════════════════════ */
const PageMarketplace=({setDrawer})=>{
  const [tab,setTab]=useState("commandes");
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Marketplace & Approvisionnement Chantier</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Catalogue, commandes, réceptions, fournisseurs</p></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
      <KPI icon={Package} label="Articles catalogue" value="156" color={C.primary}/>
      <KPI icon={ShoppingCart} label="Commandes actives" value="4" color={C.info}/>
      <KPI icon={Truck} label="En transit" value="1" color={C.warning}/>
      <KPI icon={PackageCheck} label="Réceptionnées" value="2" color={C.success}/>
      <KPI icon={Store} label="Fournisseurs actifs" value="4" color={C.purple}/>
      <KPI icon={AlertTriangle} label="Écarts qualité" value="1" sub="Humidité sable" color={C.danger} accent={C.danger}/>
    </div>
    <TabBar tabs={[{key:"commandes",label:"Commandes",count:MARKETPLACE_DATA.length},{key:"fournisseurs",label:"Fournisseurs",count:SUPPLIERS.length},{key:"incidents",label:"Incidents qualité",count:1}]} active={tab} onChange={setTab}/>

    {tab==="commandes"&&<Card noPad><MiniTable cols={[
      {key:"id",label:"Réf",render:r=><span style={{fontSize:9,fontFamily:"monospace",color:C.gray}}>{r.id}</span>},
      {key:"fournisseur",label:"Fournisseur",render:r=><span style={{fontWeight:600,fontSize:11}}>{r.fournisseur}</span>},
      {key:"projet",label:"Projet"},{key:"articles",label:"Articles",render:r=><span style={{fontSize:10,maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}>{r.articles}</span>},
      {key:"montant",label:"Montant",render:r=><span style={{fontWeight:700,fontSize:11}}>{(r.montant/1e6).toFixed(2)}M</span>},
      {key:"statut",label:"Statut",render:r=><StatusBadge s={r.statut}/>},
      {key:"dateCmd",label:"Cmd"},{key:"dateLiv",label:"Livraison",render:r=><span style={{fontSize:10}}>{r.dateLiv}</span>},
      {key:"ecartQte",label:"Écart qté",render:r=>r.ecartQte!=="—"&&r.ecartQte!=="0%"?<span style={{color:C.danger,fontWeight:600,fontSize:10}}>{r.ecartQte}</span>:<span style={{color:C.lightGray,fontSize:10}}>{r.ecartQte}</span>},
      {key:"ecartQual",label:"Qualité",render:r=>r.ecartQual!=="RAS"&&r.ecartQual!=="—"?<Badge v="warning" s="xs">{r.ecartQual}</Badge>:<span style={{color:C.lightGray,fontSize:10}}>{r.ecartQual}</span>},
    ]} data={MARKETPLACE_DATA} onRow={r=>setDrawer({type:"commande",data:r})}/></Card>}

    {tab==="fournisseurs"&&<Card noPad><MiniTable cols={[
      {key:"id",label:"Réf",render:r=><span style={{fontSize:9,fontFamily:"monospace"}}>{r.id}</span>},
      {key:"nom",label:"Fournisseur",render:r=><span style={{fontWeight:600,fontSize:12,color:C.dark}}>{r.nom}</span>},
      {key:"ville",label:"Ville"},{key:"cat",label:"Catégorie",render:r=><Badge v="dark" s="xs">{r.cat}</Badge>},
      {key:"articles",label:"Articles",render:r=><span style={{fontWeight:600}}>{r.articles}</span>},
      {key:"cmds",label:"Commandes",render:r=><span style={{fontWeight:600}}>{r.cmds}</span>},
      {key:"montantTotal",label:"Total",render:r=><span style={{fontWeight:700}}>{r.montantTotal}</span>},
      {key:"delaiMoyen",label:"Délai moy."},{key:"qualite",label:"Note",render:r=>r.qualite!=="—"?<div style={{display:"flex",alignItems:"center",gap:3}}><Star size={11} color={C.warning} fill={C.warning}/><span style={{fontSize:11,fontWeight:600}}>{r.qualite}</span></div>:<span style={{color:C.lightGray}}>—</span>},
      {key:"incidents",label:"Incid.",render:r=>r.incidents>0?<Badge v="danger" s="xs">{r.incidents}</Badge>:<Dot color={C.success}/>},
      {key:"statut",label:"Statut",render:r=><StatusBadge s={r.statut}/>},
    ]} data={SUPPLIERS} onRow={r=>setDrawer({type:"fournisseur",data:r})}/></Card>}

    {tab==="incidents"&&<Card title="Incidents qualité / écarts"><AlertRow icon={AlertTriangle} text="CMD-003 — Sable carrière : humidité élevée" sub="SOCATRAL · PRJ-001 · Livraison 03/04 · Écart qté -5%" sev="warning"/><div style={{padding:"12px 0"}}><Btn v="outline" s="xs" icon={Eye} onClick={()=>setDrawer({type:"commande",data:MARKETPLACE_DATA[2]})}>Voir détail commande</Btn></div></Card>}
  </div>;
};

/* ═══════════════════════════════════════════════════════
   9. AUDIT & LOGS
   ═══════════════════════════════════════════════════════ */
const PageAudit=({setDrawer})=>{
  const [fRole,setFRole]=useState("Tous");
  const [fCrit,setFCrit]=useState("Toutes");
  const [fMod,setFMod]=useState("Tous");
  const filtered=useMemo(()=>{
    let d=AUDIT_LOGS;
    if(fRole!=="Tous") d=d.filter(l=>l.role===fRole);
    if(fCrit!=="Toutes") d=d.filter(l=>l.crit===fCrit);
    if(fMod!=="Tous") d=d.filter(l=>l.module===fMod);
    return d;
  },[fRole,fCrit,fMod]);
  const anomalies=[
    {text:"Compte inactif + droits élevés : Ex. Ateba (MOE)",sub:"3 incidents · Dern. cnx: 02/01/2026",sev:"critical"},
    {text:"CAM-004 déconnectée >24h",sub:"PRJ-001 · Zone arrière non couverte",sev:"critical"},
    {text:"Njoya — accès GED non maîtrisé malgré habilitation",sub:"Adoption 45%",sev:"warning"},
    {text:"Modif. devis PRJ-001 sans validation SPOC préalable",sub:"16/04 10:20 — Workflow non respecté",sev:"warning"},
  ];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>Audit, Conformité & Logs</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Traçabilité, anomalies, contrôle</p></div><Btn icon={Download} v="secondary">Export CSV</Btn></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}><KPI icon={Activity} label="Actions (7j)" value="87"/><KPI icon={ShieldAlert} label="Actions critiques" value="4" color={C.danger} accent={C.danger}/><KPI icon={RefreshCw} label="Alertes système" value="6" color={C.warning}/><KPI icon={CheckCircle2} label="Valid. sensibles" value="12" color={C.success}/><KPI icon={XCircle} label="Erreurs" value="1" color={C.danger}/></div>
    <Card title="Anomalies" action={<Badge v="danger" s="xs">{anomalies.length}</Badge>}>{anomalies.map((a,i)=><div key={i} style={{cursor:"pointer"}} onClick={()=>setDrawer({type:"anomalie",data:a})}><AlertRow icon={a.sev==="critical"?ShieldAlert:AlertTriangle} text={a.text} sub={a.sub} sev={a.sev}/></div>)}</Card>
    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><span style={{fontSize:11,fontWeight:600,color:C.gray}}>Filtres:</span>
      <select value={fRole} onChange={e=>setFRole(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:11}}>{["Tous","SPOC","AMOA","MOEX","MOE","Admin","Auto"].map(r=><option key={r}>{r}</option>)}</select>
      <select value={fCrit} onChange={e=>setFCrit(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:11}}>{["Toutes","Critique","Haute","Normale","Info"].map(c=><option key={c}>{c}</option>)}</select>
      <select value={fMod} onChange={e=>setFMod(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,fontSize:11}}>{["Tous","Rapports","Stock","CRM","Achats","Utilisateurs","Facturation","Devis","Vidéo","Météo","Tâches","Conception","Système"].map(m=><option key={m}>{m}</option>)}</select>
      <span style={{fontSize:10,color:C.lightGray}}>{filtered.length} résultats</span>
    </div>
    <Card noPad><MiniTable cols={[
      {key:"date",label:"Date",render:r=><span style={{fontFamily:"monospace",fontSize:9,color:C.gray}}>{r.date}</span>},
      {key:"user",label:"Utilisateur",render:r=><div style={{display:"flex",alignItems:"center",gap:5}}><Avatar name={r.user} role={r.role} sz={20}/><span style={{fontWeight:600,fontSize:10}}>{r.user}</span></div>},
      {key:"role",label:"Rôle",render:r=><RoleBadge r={r.role}/>},
      {key:"action",label:"Action",render:r=>{const v={"Création":"success","Validation":"active","Modification":"info","Alerte":"warning","Modif. droits":"danger","Relance":"warning","Connexion":"dark","Envoi facture":"info","Modif. devis":"warning","Alerte météo":"warning","Alerte caméra":"danger","Mise à jour":"info"};return <Badge v={v[r.action]||"dark"} s="xs">{r.action}</Badge>}},
      {key:"cible",label:"Objet",render:r=><span style={{fontSize:10,color:C.gray,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}>{r.cible}</span>},
      {key:"module",label:"Module",render:r=><Badge v="dark" s="xs">{r.module}</Badge>},
      {key:"crit",label:"Criticité",render:r=><Badge v={{"Critique":"critical","Haute":"danger","Normale":"dark","Info":"info"}[r.crit]||"dark"} s="xs">{r.crit}</Badge>},
      {key:"result",label:"Résultat",render:r=><span style={{fontSize:10,color:r.result==="OK"||r.result==="Approuvé"?C.success:r.result.includes("Alerte")?C.danger:C.gray}}>{r.result}</span>},
    ]} data={filtered} onRow={r=>setDrawer({type:"audit-detail",data:r})}/></Card>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   10. KPI GLOBAL
   ═══════════════════════════════════════════════════════ */
const PageKPI=({setDrawer})=>{
  const [sec,setSec]=useState("commercial");
  const secs=[{key:"commercial",label:"Commercial",icon:TrendingUp},{key:"projets",label:"Projets",icon:Building2},{key:"exploitation",label:"Exploitation",icon:Activity},{key:"adoption",label:"Adoption",icon:Users},{key:"partenaires",label:"Partenaires",icon:Briefcase},{key:"marketplace",label:"Marketplace",icon:Store},{key:"finance",label:"Finance",icon:Banknote},{key:"conformite",label:"Conformité",icon:Shield}];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div><h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:0}}>KPI Global — Pilotage stratégique</h2><p style={{fontSize:11,color:C.gray,margin:"3px 0 0"}}>Indicateurs consolidés</p></div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{secs.map(s=><button key={s.key} onClick={()=>setSec(s.key)} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:7,background:sec===s.key?C.primary:"#fff",color:sec===s.key?"#fff":C.gray,border:`1px solid ${sec===s.key?C.primary:C.border}`,cursor:"pointer",fontSize:11,fontWeight:600}}><s.icon size={13}/>{s.label}</button>)}</div>

    {sec==="commercial"&&<React.Fragment><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}><KPI icon={Target} label="Taux conversion" value="14%" color={C.warning} trend={-5} onClick={()=>setDrawer({type:"kpi-detail",data:{label:"Taux conversion",details:"1 converti sur 7 prospects ce mois. -5% vs mois précédent. Source principale: site web (43%)"}})}/><KPI icon={Clock} label="Cycle moyen" value="18j" color={C.info}/><KPI icon={DollarSign} label="Pipeline" value="578M" color={C.success} trend={12}/><KPI icon={Users} label="Leads/source" value="3" sub="Site web en tête" color={C.primary}/><KPI icon={Percent} label="Transf. par type" value="33%" sub="Constr. neuve" color={C.success}/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Card title="Conversion par type">{[{t:"Construction neuve",l:3,c:1},{t:"Rénovation",l:2,c:0},{t:"Reprise",l:1,c:0},{t:"Ameublement",l:1,c:0}].map((x,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer"}} onClick={()=>setDrawer({type:"kpi-detail",data:{label:x.t,details:`${x.l} leads, ${x.c} convertis, taux ${x.c>0?Math.round(x.c/x.l*100):0}%`}})}><span style={{fontSize:11,flex:1}}>{x.t}</span><span style={{fontSize:10,color:C.gray}}>{x.l} leads</span><span style={{fontSize:11,fontWeight:700,color:x.c>0?C.success:C.lightGray}}>{x.c>0?`${Math.round(x.c/x.l*100)}%`:"0%"}</span></div>)}</Card>
    <Card title="Évolution pipeline"><div style={{display:"flex",alignItems:"flex-end",gap:6,height:100}}>{[{m:"Jan",v:120},{m:"Fév",v:185},{m:"Mar",v:310},{m:"Avr",v:578}].map((x,i)=><div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:`${(x.v/578)*100}%`,background:`linear-gradient(180deg,${C.primary},${C.secondary})`,borderRadius:"3px 3px 0 0",minHeight:8}}/><div style={{fontSize:9,fontWeight:700,color:C.dark,marginTop:3}}>{x.v}M</div><div style={{fontSize:9,color:C.gray}}>{x.m}</div></div>)}</div></Card></div></React.Fragment>}

    {sec==="projets"&&<React.Fragment><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}><KPI icon={BarChart3} label="Avancement moy." value="17%"/><KPI icon={AlertTriangle} label="En retard" value="0" color={C.success}/><KPI icon={DollarSign} label="Écart budget" value="+2%" color={C.success}/><KPI icon={Layers} label="Lots actifs" value="3" color={C.info}/><KPI icon={Clock} label="Valid. attente" value="4" color={C.warning}/></div><Card title="Avancement par projet">{PROJECTS.map((p,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer"}} onClick={()=>setDrawer({type:"project",data:p})}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:600}}>{p.nom}</span><StatusBadge s={p.phase}/></div><ScoreBar value={p.avt} label h={7}/><div style={{display:"flex",gap:12,marginTop:4}}><span style={{fontSize:9,color:C.gray}}>Budget: {(p.budget/1e6).toFixed(0)}M</span><span style={{fontSize:9,color:C.gray}}>Dép: {(p.dep/1e6).toFixed(1)}M</span><span style={{fontSize:9,color:p.sante==="Bon"?C.success:C.warning}}>Santé: {p.sante}</span></div></div>)}</Card></React.Fragment>}

    {sec==="adoption"&&<React.Fragment><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}><KPI icon={Users} label="Connexions (7j)" value="42" trend={8}/><KPI icon={Gauge} label="Adoption moy." value="59%" color={C.warning}/><KPI icon={GraduationCap} label="Onboarding fait" value="4/10" color={C.info}/><KPI icon={UserX} label="À renforcer" value="4" color={C.danger} accent={C.danger}/><KPI icon={Award} label="Référents" value="1" color={C.success}/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Card title="Adoption par rôle">{[{r:"SPOC",c:2,sc:86},{r:"AMOA",c:2,sc:76},{r:"MOE",c:1,sc:45},{r:"MOEX",c:1,sc:82},{r:"Client",c:3,sc:43}].map((x,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${C.borderLight}`}}><RoleBadge r={x.r}/><span style={{fontSize:11,flex:1}}>{x.c} users</span><ScoreBar value={x.sc} label/></div>)}</Card>
    <Card title="Usage par module (7j)">{[{m:"CRM",a:18},{m:"Rapports",a:15},{m:"Tâches",a:12},{m:"GED",a:8},{m:"Devis",a:6},{m:"Stock",a:5},{m:"Achats",a:4},{m:"Messagerie",a:3},{m:"Facturation",a:2}].map((x,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",borderBottom:`1px solid ${C.borderLight}`}}><span style={{fontSize:11,flex:1}}>{x.m}</span><span style={{fontSize:10,fontWeight:600,color:C.primary}}>{x.a}</span></div>)}</Card></div></React.Fragment>}

    {sec==="finance"&&<React.Fragment><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}><KPI icon={Banknote} label="Encaissé" value="45M" color={C.success}/><KPI icon={DollarSign} label="Décaissé" value="25.85M" color={C.warning}/><KPI icon={Receipt} label="Solde séquestre" value="+19.15M" color={C.success}/><KPI icon={AlertTriangle} label="Anomalies" value="1" color={C.danger}/><KPI icon={Clock} label="DDC en attente" value="1" color={C.info}/></div><Card title="Flux financiers par projet">{PROJECTS.map((p,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer"}} onClick={()=>setDrawer({type:"project",data:p})}><div style={{fontSize:12,fontWeight:600,marginBottom:4}}>{p.nom}</div><div style={{display:"flex",gap:14}}><span style={{fontSize:10,color:C.gray}}>Budget: {(p.budget/1e6).toFixed(0)}M</span><span style={{fontSize:10,color:C.success}}>Encaissé: {p.id==="PRJ-001"?"45M":"0"}</span><span style={{fontSize:10,color:C.warning}}>Décaissé: {(p.dep/1e6).toFixed(1)}M</span><span style={{fontSize:10,color:C.primary}}>Marge: {p.id==="PRJ-001"?"+19.15M":"—"}</span></div></div>)}</Card></React.Fragment>}

    {["exploitation","partenaires","marketplace","conformite"].includes(sec)&&<Card title={`Section "${secs.find(s=>s.key===sec)?.label}" — KPIs détaillés`}><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      {sec==="exploitation"&&<React.Fragment><KPI icon={FileCheck} label="Rapports <24h" value="94%" color={C.success}/><KPI icon={CheckCircle2} label="Valid. dans délai" value="89%" color={C.success}/><KPI icon={FolderOpen} label="Complétude docs" value="82%" color={C.primary}/><KPI icon={Package} label="Incidents stock" value="2" color={C.warning}/></React.Fragment>}
      {sec==="partenaires"&&<React.Fragment><KPI icon={Briefcase} label="Partenaires actifs" value="3"/><KPI icon={Clock} label="Respect délais" value="88%" color={C.success}/><KPI icon={Star} label="Qualité livrables" value="4.2/5" color={C.warning}/><KPI icon={AlertTriangle} label="Incidents" value="3" color={C.danger}/></React.Fragment>}
      {sec==="marketplace"&&<React.Fragment><KPI icon={ShoppingCart} label="Commandes" value="4"/><KPI icon={PackageCheck} label="Livrées" value="2" color={C.success}/><KPI icon={AlertTriangle} label="Écarts" value="1" color={C.warning}/><KPI icon={Store} label="Fournisseurs" value="4" color={C.purple}/></React.Fragment>}
      {sec==="conformite"&&<React.Fragment><KPI icon={ShieldCheck} label="Conformité glob." value="91%" color={C.success}/><KPI icon={ShieldAlert} label="Violations" value="2" color={C.danger}/><KPI icon={History} label="Actions auditées" value="87" color={C.primary}/><KPI icon={Lock} label="Accès non autorisés" value="0" color={C.success}/></React.Fragment>}
    </div></Card>}
  </div>;
};

/* ═══════════════════════════════════════════════════════
   DRAWER CONTENT RENDERER
   ═══════════════════════════════════════════════════════ */
const DrawerContent=({drawer,setDrawer})=>{
  if(!drawer) return null;
  const {type,data:d}=drawer;

  if(type==="user") return <Drawer title="Fiche utilisateur" onClose={()=>setDrawer(null)} width={500}>
    <div style={{display:"flex",alignItems:"center",gap:12}}><Avatar name={d.nom} role={d.role} sz={48}/><div><div style={{fontSize:16,fontWeight:700,color:C.dark}}>{d.nom}</div><div style={{fontSize:11,color:C.gray}}>{d.email}</div><div style={{display:"flex",gap:4,marginTop:4}}><RoleBadge r={d.role}/><StatusBadge s={d.statut}/></div></div></div>
    <div style={{background:C.bg,borderRadius:10,padding:14}}><div style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:8}}>Qualification & Habilitation</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><InfoBlock label="Onboarding" value={<StatusBadge s={d.onboarding}/>}/><InfoBlock label="Maturité" value={<Badge v={{"Référent":"success","Confirmé":"active","Autonome":"info","Assisté":"warning","Découverte":"dark"}[d.maturite]||"dark"} s="xs">{d.maturite}</Badge>}/><InfoBlock label="Score adoption" value={<ScoreBar value={d.adoption} label/>}/><InfoBlock label="Projets" value={d.projets}/></div></div>
    <div><div style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:6}}>Modules autorisés</div><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{d.habs.length>0?d.habs.map((h,i)=><Badge key={i} v="success" s="xs">{h}</Badge>):<span style={{fontSize:10,color:C.lightGray}}>Aucun</span>}</div></div>
    {d.modulesWeak.length>0&&<div><div style={{fontSize:12,fontWeight:700,color:C.warning,marginBottom:6}}>Modules à renforcer</div><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{d.modulesWeak.map((m,i)=><Badge key={i} v="warning" s="xs">{m}</Badge>)}</div></div>}
    <div style={{background:C.bg,borderRadius:10,padding:14}}><div style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:8}}>Activité & Statistiques</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,textAlign:"center"}}><div><div style={{fontSize:16,fontWeight:800,color:C.dark}}>{d.actions7j}</div><div style={{fontSize:9,color:C.gray}}>Actions 7j</div></div><div><div style={{fontSize:16,fontWeight:800,color:d.incidents>0?C.danger:C.success}}>{d.incidents}</div><div style={{fontSize:9,color:C.gray}}>Incidents</div></div><div><div style={{fontSize:16,fontWeight:800,color:C.dark}}>{d.sessions}</div><div style={{fontSize:9,color:C.gray}}>Sessions</div></div><div><div style={{fontSize:16,fontWeight:800,color:C.dark}}>{d.docsTraites}</div><div style={{fontSize:9,color:C.gray}}>Docs traités</div></div></div></div>
    <div style={{background:C.bg,borderRadius:10,padding:14}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}><div><div style={{fontSize:16,fontWeight:800,color:C.success}}>{d.validations}</div><div style={{fontSize:9,color:C.gray}}>Validations</div></div><div><div style={{fontSize:16,fontWeight:800,color:C.danger}}>{d.rejet}</div><div style={{fontSize:9,color:C.gray}}>Rejets</div></div><div><div style={{fontSize:9,fontFamily:"monospace",color:C.gray,marginTop:4}}>{d.conn}</div><div style={{fontSize:9,color:C.gray}}>Dern. cnx</div></div></div></div>
    <div><div style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:6}}>Actions administrateur</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}><Btn icon={Edit} v="secondary" s="xs">Modifier rôle</Btn><Btn icon={Building2} v="secondary" s="xs">Affecter projet</Btn><Btn icon={Plus} v="secondary" s="xs">Rôle secondaire</Btn><Btn icon={GraduationCap} v="secondary" s="xs">Lancer onboarding</Btn><Btn icon={RefreshCw} v="secondary" s="xs">Réinit. mdp</Btn><Btn icon={Lock} v="secondary" s="xs">Modifier habilitations</Btn><Btn icon={KeyRound} v="secondary" s="xs">Permission except.</Btn><Btn icon={Shield} v="secondary" s="xs">Journal audit</Btn><Btn icon={BarChart3} v="secondary" s="xs">Usage modules</Btn>{d.statut==="Actif"?<Btn icon={UserX} v="danger" s="xs">Suspendre</Btn>:<Btn icon={Unlock} v="outline" s="xs">Réactiver</Btn>}</div></div>
  </Drawer>;

  if(type==="project") return <Drawer title="Synthèse Projet" onClose={()=>setDrawer(null)} width={520}>
    <div><div style={{fontSize:16,fontWeight:800,color:C.dark}}>{d.nom}</div><div style={{fontSize:11,color:C.gray,marginTop:2}}>{d.id} · {d.type} · {d.ville}</div><div style={{display:"flex",gap:4,marginTop:6}}><StatusBadge s={d.phase}/><StatusBadge s={d.sante}/><Badge v={d.risque==="Faible"?"success":d.risque==="Moyen"?"warning":"danger"} s="xs">Risque: {d.risque}</Badge></div></div>
    <div style={{background:C.bg,borderRadius:10,padding:14}}><div style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:8}}>Acteurs</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[{r:"Client",n:d.client},{r:"SPOC",n:d.spoc},{r:"AMOA",n:d.amoa},{r:"MOEX",n:d.moex}].map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6}}><Avatar name={a.n} role={a.r} sz={22}/><div><div style={{fontSize:9,color:C.gray}}>{a.r}</div><div style={{fontSize:11,fontWeight:600,color:C.dark}}>{a.n}</div></div></div>)}</div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={{background:C.bg,borderRadius:10,padding:14,textAlign:"center"}}><div style={{fontSize:9,color:C.gray}}>Budget</div><div style={{fontSize:18,fontWeight:800,color:C.dark,marginTop:3}}>{(d.budget/1e6).toFixed(0)}M</div><div style={{fontSize:9,color:C.gray}}>Dépensé: {(d.dep/1e6).toFixed(1)}M ({Math.round(d.dep/d.budget*100)}%)</div><ScoreBar value={d.dep/d.budget*100} h={5}/></div>
      <div style={{background:C.bg,borderRadius:10,padding:14,textAlign:"center"}}><div style={{fontSize:9,color:C.gray}}>Avancement</div><div style={{fontSize:18,fontWeight:800,color:C.dark,marginTop:3}}>{d.avt}%</div><ScoreBar value={d.avt} h={5}/><div style={{fontSize:9,color:C.gray,marginTop:3}}>Prochain: {d.jalon}</div></div>
    </div>
    {d.validPend>0&&<div style={{background:C.warningLight,borderRadius:10,padding:10}}><div style={{fontSize:11,fontWeight:700,color:C.warningDark}}><Clock size={11} style={{marginRight:3}}/>{d.validPend} validation{d.validPend>1?"s":""} en attente</div></div>}
    {d.alertes>0&&<div style={{background:C.dangerLight,borderRadius:10,padding:10}}><div style={{fontSize:11,fontWeight:700,color:C.dangerDark}}><AlertTriangle size={11} style={{marginRight:3}}/>{d.alertes} alerte{d.alertes>1?"s":""} active{d.alertes>1?"s":""}</div></div>}
  </Drawer>;

  if(type==="prospect") return <Drawer title="Fiche Prospect" onClose={()=>setDrawer(null)}>
    <div style={{fontSize:16,fontWeight:700,color:C.dark}}>{d.nom}</div><div style={{display:"flex",gap:4,marginTop:4}}><StatusBadge s={d.statut}/><Badge v="dark" s="xs">{d.source}</Badge></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><InfoBlock label="Type" value={d.type}/><InfoBlock label="Bien" value={d.bien}/><InfoBlock label="Région" value={d.region}/><InfoBlock label="Budget" value={d.budget+" FCFA"}/><InfoBlock label="Score IA" value={<ScoreBar value={d.score} label/>}/><InfoBlock label="Qualité fiche" value={<ScoreBar value={d.qualFiche} label/>}/><InfoBlock label="SPOC" value={d.spoc}/><InfoBlock label="Financement" value={d.finance}/><InfoBlock label="Dernière action" value={d.dernAction}/><InfoBlock label="Délai sans contact" value={d.delai>0?`${d.delai} jours`:"Aujourd'hui"}/></div>
  </Drawer>;

  if(type==="finance") return <Drawer title="Détail opération financière" onClose={()=>setDrawer(null)}>
    <div style={{display:"flex",gap:4}}><Badge v={d.type.includes("Décaissement")?"warning":d.type.includes("Paiement")?"success":"info"}>{d.type}</Badge><StatusBadge s={d.statut}/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><InfoBlock label="Référence" value={d.id}/><InfoBlock label="Projet" value={d.projet}/><InfoBlock label="Objet" value={d.objet}/><InfoBlock label="Montant" value={`${(d.montant/1e6).toFixed(2)}M FCFA`}/><InfoBlock label="Demandeur" value={d.demandeur}/><InfoBlock label="Valideur" value={d.valideur||"En attente"}/><InfoBlock label="Date" value={d.date}/><InfoBlock label="Pièces jointes" value={`${d.pieces} document${d.pieces>1?"s":""}`}/>{d.fournisseur!=="—"&&<InfoBlock label="Fournisseur" value={d.fournisseur}/>}</div>
    <div style={{display:"flex",flexWrap:"wrap",gap:5}}><Btn icon={CheckCircle2} v="primary" s="xs">Valider</Btn><Btn icon={XCircle} v="danger" s="xs">Rejeter</Btn><Btn icon={Eye} v="secondary" s="xs">Voir pièces</Btn><Btn icon={Download} v="secondary" s="xs">Export PDF</Btn></div>
  </Drawer>;

  if(type==="commande") return <Drawer title="Détail commande" onClose={()=>setDrawer(null)}>
    <div style={{display:"flex",gap:4}}><Badge v="info">{d.id}</Badge><StatusBadge s={d.statut}/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><InfoBlock label="Fournisseur" value={d.fournisseur}/><InfoBlock label="Projet" value={d.projet}/><InfoBlock label="Articles" value={d.articles}/><InfoBlock label="Montant" value={`${(d.montant/1e6).toFixed(2)}M FCFA`}/><InfoBlock label="Date commande" value={d.dateCmd}/><InfoBlock label="Livraison" value={d.dateLiv}/><InfoBlock label="Écart quantité" value={d.ecartQte}/><InfoBlock label="Écart qualité" value={d.ecartQual}/></div>
  </Drawer>;

  if(type==="fournisseur") return <Drawer title="Fiche fournisseur" onClose={()=>setDrawer(null)}>
    <div style={{fontSize:16,fontWeight:700,color:C.dark}}>{d.nom}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><InfoBlock label="Ville" value={d.ville}/><InfoBlock label="Catégorie" value={d.cat}/><InfoBlock label="Articles catalogue" value={d.articles}/><InfoBlock label="Commandes" value={d.cmds}/><InfoBlock label="Montant total" value={d.montantTotal+" FCFA"}/><InfoBlock label="Délai moyen" value={d.delaiMoyen}/><InfoBlock label="Note qualité" value={d.qualite!==""?d.qualite+"/5":"—"}/><InfoBlock label="Incidents" value={d.incidents}/></div>
  </Drawer>;

  if(type==="permission") return <Drawer title="Détail permission" onClose={()=>setDrawer(null)}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><InfoBlock label="Rôle" value={<RoleBadge r={d.role}/>}/><InfoBlock label="Module" value={d.mod}/><InfoBlock label="Action" value={d.act}/><InfoBlock label="Niveau" value={<Badge v={d.val==="full"?"success":d.val==="own"?"info":d.val==="double"?"warning":d.val==="planned"?"dark":"danger"}>{d.val==="full"?"Complet":d.val==="own"?"Périmètre propre":d.val==="double"?"Double validation":d.val==="planned"?"Prévu (phase 2)":"Aucun"}</Badge>}/></div>
    {d.val==="double"&&<div style={{background:C.warningLight,borderRadius:8,padding:10,fontSize:11,color:C.warningDark}}><AlertTriangle size={12} style={{marginRight:4}}/>Cette permission nécessite une double validation (ex: Admin + Comptable)</div>}
    {["Approuver DDC","Admin permissions","Données sensibles","Supprimer"].includes(d.act)&&<div style={{background:C.dangerLight,borderRadius:8,padding:10,fontSize:11,color:C.dangerDark}}><ShieldAlert size={12} style={{marginRight:4}}/>Permission sensible — journalisée dans l'audit</div>}
  </Drawer>;

  if(type==="alert-detail"||type==="alerts") return <Drawer title="Détail alerte" onClose={()=>setDrawer(null)}>
    {type==="alerts"?d.map((a,i)=><div key={i}><AlertRow {...a}/></div>):<React.Fragment><div style={{fontSize:14,fontWeight:700,color:C.dark}}>{d.text}</div>{d.sub&&<div style={{fontSize:11,color:C.gray}}>{d.sub}</div>}<div style={{display:"flex",gap:4,marginTop:6}}><Badge v={d.sev==="critical"?"danger":d.sev==="warning"?"warning":"info"}>{d.sev}</Badge><span style={{fontSize:10,color:C.lightGray}}>{d.time}</span></div><div style={{display:"flex",gap:5,marginTop:10}}><Btn icon={CheckCircle2} s="xs">Acquitter</Btn><Btn icon={Edit} v="secondary" s="xs">Assigner</Btn><Btn icon={Eye} v="secondary" s="xs">Voir objet source</Btn></div></React.Fragment>}
  </Drawer>;

  if(type==="audit-detail") return <Drawer title="Détail log" onClose={()=>setDrawer(null)}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><InfoBlock label="Date" value={d.date}/><InfoBlock label="Utilisateur" value={d.user}/><InfoBlock label="Rôle" value={<RoleBadge r={d.role}/>}/><InfoBlock label="Action" value={d.action}/><InfoBlock label="Objet" value={d.cible}/><InfoBlock label="Module" value={d.module}/><InfoBlock label="Criticité" value={<Badge v={{"Critique":"critical","Haute":"danger","Normale":"dark","Info":"info"}[d.crit]||"dark"}>{d.crit}</Badge>}/><InfoBlock label="Résultat" value={d.result}/></div>
  </Drawer>;

  if(type==="anomalie") return <Drawer title="Anomalie détectée" onClose={()=>setDrawer(null)}>
    <div style={{fontSize:14,fontWeight:700,color:C.dark}}>{d.text}</div><div style={{fontSize:11,color:C.gray}}>{d.sub}</div><Badge v={d.sev==="critical"?"danger":"warning"}>{d.sev}</Badge>
    <div style={{display:"flex",gap:5,marginTop:8}}><Btn icon={CheckCircle2} s="xs">Résoudre</Btn><Btn icon={Edit} v="secondary" s="xs">Assigner</Btn><Btn icon={Shield} v="secondary" s="xs">Ouvrir audit</Btn></div>
  </Drawer>;

  if(type==="param-detail") return <Drawer title={d.t} onClose={()=>setDrawer(null)}>
    <InfoBlock label="Description" value={d.d}/><InfoBlock label="Statut" value={d.c}/>
    <div style={{background:C.bg,borderRadius:8,padding:12,fontSize:11,color:C.gray}}>Cliquez sur "Modifier" pour accéder à la configuration détaillée de ce paramètre. L'historique des modifications est disponible dans le journal d'audit.</div>
    <div style={{display:"flex",gap:5}}><Btn icon={Edit} s="xs">Modifier</Btn><Btn icon={History} v="secondary" s="xs">Historique</Btn><Btn icon={Eye} v="secondary" s="xs">Aperçu impact</Btn><Btn icon={Download} v="secondary" s="xs">Export</Btn></div>
  </Drawer>;

  if(type==="ia-detail") return <Drawer title="Recommandation IA" onClose={()=>setDrawer(null)}>
    <div style={{display:"flex",alignItems:"center",gap:6}}><d.icon size={16} color={d.cl}/><span style={{fontSize:13,fontWeight:600,color:C.dark}}>{d.text}</span></div>
    <div style={{background:C.bg,borderRadius:8,padding:12,fontSize:11,color:C.gray}}>Analyse automatique basée sur les données plateforme. Actions suggérées disponibles ci-dessous.</div>
    <div style={{display:"flex",gap:5}}><Btn icon={CheckCircle2} s="xs">Appliquer</Btn><Btn icon={Eye} v="secondary" s="xs">Voir objet lié</Btn><Btn icon={XCircle} v="ghost" s="xs">Ignorer</Btn></div>
  </Drawer>;

  if(type==="kpi-detail") return <Drawer title={d.label} onClose={()=>setDrawer(null)}>
    <div style={{fontSize:13,fontWeight:600,color:C.dark}}>{d.label}</div><div style={{fontSize:11,color:C.gray,lineHeight:1.5}}>{d.details}</div>
  </Drawer>;

  return <Drawer title="Détail" onClose={()=>setDrawer(null)}><div style={{fontSize:12,color:C.gray}}>Contenu détaillé</div></Drawer>;
};

/* ═══════════════════════════════════════════════════════
   SIDEBAR + TOPBAR + MAIN APP
   ═══════════════════════════════════════════════════════ */
const NAV=[
  {key:"dashboard",label:"Vue Globale",icon:LayoutDashboard},
  {key:"users",label:"Utilisateurs",icon:Users},
  {key:"permissions",label:"Permissions",icon:KeyRound},
  {key:"prospects",label:"Prospects / CRM",icon:Target},
  {key:"projets",label:"Projets",icon:Building2},
  {key:"parametrage",label:"Paramétrage",icon:Settings},
  {key:"finance",label:"Finance & Paiements",icon:Banknote},
  {key:"marketplace",label:"Marketplace / Appro",icon:Store},
  {key:"audit",label:"Audit & Logs",icon:Shield},
  {key:"kpi",label:"KPI Global",icon:BarChart3},
];

const Sidebar=({nav,onNav,collapsed})=><div style={{width:collapsed?60:230,minHeight:"100vh",background:C.dark,color:"#fff",display:"flex",flexDirection:"column",transition:"width .2s",overflow:"hidden",flexShrink:0}}>
  <div style={{padding:collapsed?"18px 10px":"18px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.08)"}}><div style={{width:34,height:34,borderRadius:"50%",background:C.secondary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff",flexShrink:0}}>K</div>{!collapsed&&<div><div style={{fontSize:13,fontWeight:700,letterSpacing:.5}}>KOMA Expertise</div><div style={{fontSize:9,color:"rgba(255,255,255,.45)",letterSpacing:.8,textTransform:"uppercase"}}>Administration</div></div>}</div>
  <div style={{flex:1,padding:"10px 6px",display:"flex",flexDirection:"column",gap:1}}>{NAV.map(it=>{const a=nav===it.key;return <button key={it.key} onClick={()=>onNav(it.key)} style={{display:"flex",alignItems:"center",gap:8,padding:collapsed?"8px 10px":"7px 10px",borderRadius:7,border:"none",cursor:"pointer",background:a?"rgba(24,183,210,.15)":"transparent",color:a?C.primary:"rgba(255,255,255,.55)",fontSize:12,fontWeight:a?600:400,transition:"all .15s",textAlign:"left",width:"100%"}}><it.icon size={16} style={{flexShrink:0}}/>{!collapsed&&<span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.label}</span>}</button>})}</div>
  {!collapsed&&<div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:8}}><div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.primary}}>A</div><div style={{flex:1}}><div style={{fontSize:11,fontWeight:600,color:"#fff"}}>Admin KOMA</div><div style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>Super Administrateur</div></div><LogOut size={13} color="rgba(255,255,255,.3)" style={{cursor:"pointer"}}/></div>}
</div>;

const TopBar=({onToggle})=><div style={{height:52,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.border}`,background:"#fff",flexShrink:0}}>
  <div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={onToggle} style={{background:"none",border:"none",cursor:"pointer",padding:3,color:C.gray,display:"flex"}}><Menu size={18}/></button><div style={{display:"flex",alignItems:"center",gap:5,background:C.bg,borderRadius:7,padding:"5px 12px",border:`1px solid ${C.border}`,width:300}}><Search size={13} color={C.lightGray}/><input placeholder="Rechercher…" style={{border:"none",background:"transparent",outline:"none",fontSize:11,color:C.darkGray,width:"100%"}}/></div></div>
  <div style={{display:"flex",alignItems:"center",gap:12}}><Badge v="active" s="lg">Portail Admin</Badge><div style={{position:"relative",cursor:"pointer"}}><Bell size={16} color={C.gray}/><div style={{position:"absolute",top:-2,right:-2,width:7,height:7,borderRadius:"50%",background:C.danger,border:"2px solid #fff"}}/></div></div>
</div>;

export default function KomaAdminPortalV2(){
  const [nav,setNav]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);
  const [drawer,setDrawer]=useState(null);

  const page=()=>{switch(nav){
    case "dashboard":return <PageDashboard onNav={setNav} setDrawer={setDrawer}/>;
    case "users":return <PageUsers setDrawer={setDrawer}/>;
    case "permissions":return <PagePermissions setDrawer={setDrawer}/>;
    case "prospects":return <PageCRM setDrawer={setDrawer}/>;
    case "projets":return <PageProjects setDrawer={setDrawer}/>;
    case "parametrage":return <PageParametrage setDrawer={setDrawer}/>;
    case "finance":return <PageFinance setDrawer={setDrawer}/>;
    case "marketplace":return <PageMarketplace setDrawer={setDrawer}/>;
    case "audit":return <PageAudit setDrawer={setDrawer}/>;
    case "kpi":return <PageKPI setDrawer={setDrawer}/>;
    default:return <PageDashboard onNav={setNav} setDrawer={setDrawer}/>;
  }};

  return <div style={{display:"flex",height:"100vh",width:"100%",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",background:C.bg,overflow:"hidden"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');*{box-sizing:border-box;margin:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}::-webkit-scrollbar-track{background:transparent}button:hover{opacity:.92}`}</style>
    <Sidebar nav={nav} onNav={n=>{setNav(n);setDrawer(null)}} collapsed={collapsed}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <TopBar onToggle={()=>setCollapsed(p=>!p)}/>
      <div style={{flex:1,overflow:"auto",padding:20}}>{page()}</div>
    </div>
    <DrawerContent drawer={drawer} setDrawer={setDrawer}/>
  </div>;
}
