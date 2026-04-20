import { useState, useCallback, useMemo } from "react";
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
  ShieldCheck, ShieldAlert, GitBranch, Workflow, ListChecks
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// DESIGN SYSTEM — KOMA Expertise Admin Portal
// ═══════════════════════════════════════════════════════════════

const C = {
  primary: "#18B7D2",
  primaryDark: "#0E95AD",
  primaryDeep: "#0A7B94",
  primaryLight: "#E0F5F9",
  primaryGhost: "#F0FAFB",
  secondary: "#6BC0AA",
  secondaryDark: "#4FA08B",
  secondaryLight: "#E8F5F0",
  dark: "#1D1D1B",
  dark2: "#2A2A28",
  darkGray: "#374151",
  gray: "#6B7280",
  lightGray: "#9CA3AF",
  faintGray: "#D1D5DB",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  bg: "#F7F8FA",
  bgCard: "#FFFFFF",
  success: "#10B981",
  successLight: "#D1FAE5",
  successDark: "#065F46",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  warningDark: "#92400E",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  dangerDark: "#991B1B",
  info: "#3B82F6",
  infoLight: "#DBEAFE",
  infoDark: "#1E40AF",
  purple: "#8B5CF6",
  purpleLight: "#EDE9FE",
  purpleDark: "#5B21B6",
};

const ROLE_STYLES = {
  Admin: { bg: "#F3F4F6", color: "#1F2937", icon: Shield },
  SPOC: { bg: C.primaryLight, color: C.primaryDark, icon: Users },
  AMOA: { bg: C.secondaryLight, color: C.secondaryDark, icon: Briefcase },
  MOE: { bg: C.purpleLight, color: C.purpleDark, icon: Ruler },
  MOEX: { bg: C.warningLight, color: C.warningDark, icon: HardHat },
  Client: { bg: C.infoLight, color: C.infoDark, icon: Home },
};

// ═══════════════════════════════════════════════════════════════
// MOCK DATA — Rich & Credible
// ═══════════════════════════════════════════════════════════════

const ADMIN_USERS = [
  { id: 1, nom: "Marie Atangana", email: "m.atangana@koma.cm", role: "SPOC", rolesSecondaires: [], statut: "Actif", statutOnboarding: "Opérationnel", maturite: "Confirmé", scoreAdoption: 94, projets: 3, derniereConnexion: "18/04/2026 09:12", actionsRecentes: 28, incidents: 0, habilitations: ["CRM", "Devis", "Validation projet", "Facturation"], modulesArenforcer: [], qualitePortefeuille: "Excellente" },
  { id: 2, nom: "Fabien Nkoulou", email: "f.nkoulou@koma.cm", role: "SPOC", rolesSecondaires: [], statut: "Actif", statutOnboarding: "Qualifié", maturite: "Autonome", scoreAdoption: 78, projets: 1, derniereConnexion: "17/04/2026 16:40", actionsRecentes: 14, incidents: 1, habilitations: ["CRM", "Devis"], modulesArenforcer: ["Facturation", "GED"], qualitePortefeuille: "Bonne" },
  { id: 3, nom: "Samuel Kamga", email: "s.kamga@wecare.cm", role: "AMOA", rolesSecondaires: ["Acheteur"], statut: "Actif", statutOnboarding: "Opérationnel", maturite: "Référent", scoreAdoption: 97, projets: 2, derniereConnexion: "18/04/2026 08:45", actionsRecentes: 35, incidents: 0, habilitations: ["Validation", "Rapports", "Achats", "Stock", "Devis", "GED"], modulesArenforcer: [], qualitePortefeuille: "Excellente" },
  { id: 4, nom: "Boris Ekambi", email: "b.ekambi@btp-cameroun.cm", role: "MOEX", rolesSecondaires: [], statut: "Actif", statutOnboarding: "Qualifié", maturite: "Autonome", scoreAdoption: 82, projets: 1, derniereConnexion: "18/04/2026 07:30", actionsRecentes: 22, incidents: 2, habilitations: ["Rapports terrain", "Stock", "Tâches"], modulesArenforcer: ["Achats"], qualitePortefeuille: "Bonne" },
  { id: 5, nom: "Arc. Henri Njoya", email: "njoya@archi-studio.cm", role: "MOE", rolesSecondaires: [], statut: "Actif", statutOnboarding: "En onboarding", maturite: "Assisté", scoreAdoption: 45, projets: 1, derniereConnexion: "15/04/2026 11:20", actionsRecentes: 5, incidents: 0, habilitations: ["Plans", "Études"], modulesArenforcer: ["GED", "Tâches", "Planning"], qualitePortefeuille: "À évaluer" },
  { id: 6, nom: "Jean-Pierre Fouda", email: "jp.fouda@yahoo.fr", role: "Client", rolesSecondaires: [], statut: "Actif", statutOnboarding: "Opérationnel", maturite: "Autonome", scoreAdoption: 88, projets: 1, derniereConnexion: "18/04/2026 20:05", actionsRecentes: 8, incidents: 0, habilitations: ["Consultation", "Paiement", "Messages"], modulesArenforcer: [], qualitePortefeuille: "—" },
  { id: 7, nom: "Moussa Ndiaye", email: "m.ndiaye@gmail.com", role: "Client", rolesSecondaires: [], statut: "Actif", statutOnboarding: "En onboarding", maturite: "Découverte", scoreAdoption: 32, projets: 1, derniereConnexion: "14/04/2026 16:40", actionsRecentes: 3, incidents: 0, habilitations: ["Consultation"], modulesArenforcer: ["Paiement", "GED", "Messages"], qualitePortefeuille: "—" },
  { id: 8, nom: "Amina Tchouangou", email: "a.tchouangou@outlook.com", role: "Client", rolesSecondaires: [], statut: "Actif", statutOnboarding: "Invité", maturite: "Découverte", scoreAdoption: 10, projets: 0, derniereConnexion: "—", actionsRecentes: 0, incidents: 0, habilitations: [], modulesArenforcer: ["Tout"], qualitePortefeuille: "—" },
  { id: 9, nom: "Ex. Ateba", email: "ateba@ex-moe.cm", role: "MOE", rolesSecondaires: [], statut: "Inactif", statutOnboarding: "Suspendu", maturite: "—", scoreAdoption: 0, projets: 0, derniereConnexion: "02/01/2026", actionsRecentes: 0, incidents: 3, habilitations: [], modulesArenforcer: [], qualitePortefeuille: "—" },
  { id: 10, nom: "Pauline Essomba", email: "p.essomba@koma.cm", role: "AMOA", rolesSecondaires: [], statut: "Actif", statutOnboarding: "En onboarding", maturite: "Assisté", scoreAdoption: 55, projets: 1, derniereConnexion: "17/04/2026 14:30", actionsRecentes: 9, incidents: 1, habilitations: ["Rapports", "Validation"], modulesArenforcer: ["Achats", "Stock", "Devis"], qualitePortefeuille: "En progression" },
];

const ADMIN_PROSPECTS = [
  { id: "P-2026-001", nom: "Moussa Ndiaye", type: "Construction neuve", bien: "Villa", region: "Douala", budget: "85M FCFA", statut: "En revue", score: 87, spoc: "Marie Atangana", source: "Site web", derniereAction: "Appel de qualification", delaiSansContact: 2, qualiteRemplissage: 92, financement: "Oui", date: "10/04/2026" },
  { id: "P-2026-002", nom: "Amina Tchouangou", type: "Rénovation", bien: "Appartement", region: "Yaoundé", budget: "25M FCFA", statut: "En attente", score: 62, spoc: "Fabien Nkoulou", source: "Recommandation", derniereAction: "Email de bienvenue", delaiSansContact: 4, qualiteRemplissage: 68, financement: "Non", date: "14/04/2026" },
  { id: "P-2026-003", nom: "Jean-Pierre Fouda", type: "Construction neuve", bien: "Duplex", region: "Kribi", budget: "120M FCFA", statut: "Converti", score: 94, spoc: "Marie Atangana", source: "Événement diaspora", derniereAction: "Conversion en projet", delaiSansContact: 0, qualiteRemplissage: 98, financement: "Oui", date: "28/03/2026" },
  { id: "P-2026-004", nom: "Cécile Ngono", type: "Reprise chantier", bien: "Villa", region: "Bafoussam", budget: "45M FCFA", statut: "En revue", score: 71, spoc: "Marie Atangana", source: "Site web", derniereAction: "Envoi devis préliminaire", delaiSansContact: 10, qualiteRemplissage: 85, financement: "En cours", date: "08/04/2026" },
  { id: "P-2026-005", nom: "Franck Mbarga", type: "Ameublement", bien: "Appartement", region: "Douala", budget: "18M FCFA", statut: "En attente", score: 55, spoc: "—", source: "Réseaux sociaux", derniereAction: "Formulaire soumis", delaiSansContact: 3, qualiteRemplissage: 45, financement: "Non", date: "15/04/2026" },
  { id: "P-2026-006", nom: "Pierre Tagne", type: "Construction neuve", bien: "Immeuble R+3", region: "Douala", budget: "250M FCFA", statut: "En revue", score: 91, spoc: "Marie Atangana", source: "Partenaire Connect", derniereAction: "Visite terrain planifiée", delaiSansContact: 1, qualiteRemplissage: 95, financement: "Oui", date: "16/04/2026" },
  { id: "P-2026-007", nom: "Hélène Mbouda", type: "Rénovation", bien: "Maison", region: "Yaoundé", budget: "35M FCFA", statut: "Abandonné", score: 38, spoc: "Fabien Nkoulou", source: "Site web", derniereAction: "3 relances sans réponse", delaiSansContact: 21, qualiteRemplissage: 52, financement: "Non", date: "25/03/2026" },
];

const ADMIN_PROJECTS = [
  { id: "PRJ-001", nom: "Villa Éden — Douala Bonamoussadi", client: "Jean-Pierre Fouda", type: "Construction neuve", phase: "Exécution", statut: "Actif", budget: 120000000, depense: 52800000, avancement: 44, sante: "Bon", risque: "Faible", spoc: "Marie Atangana", moex: "BTP Cameroun SARL", amoa: "S. Kamga", ville: "Douala", alertes: 1, prochainJalon: "Plancher R+1 — 25/04", validationsEnAttente: 1 },
  { id: "PRJ-002", nom: "Résidence Kotto — Douala", client: "Moussa Ndiaye", type: "Construction neuve", phase: "Devis", statut: "En validation", budget: 85000000, depense: 2100000, avancement: 8, sante: "Attention", risque: "Moyen", spoc: "Marie Atangana", moex: "—", amoa: "S. Kamga", ville: "Douala", alertes: 2, prochainJalon: "Validation devis — 22/04", validationsEnAttente: 3 },
  { id: "PRJ-003", nom: "Rénovation App. Bastos — Yaoundé", client: "Amina Tchouangou", type: "Rénovation", phase: "Pré-faisabilité", statut: "Brouillon", budget: 25000000, depense: 0, avancement: 0, sante: "En attente", risque: "Faible", spoc: "Fabien Nkoulou", moex: "—", amoa: "P. Essomba", ville: "Yaoundé", alertes: 0, prochainJalon: "Étude géotechnique — 30/04", validationsEnAttente: 0 },
];

const AUDIT_LOGS = [
  { date: "18/04 09:12", user: "Marie Atangana", role: "SPOC", action: "Connexion", cible: "Session ouverte", module: "Système", criticite: "Info", resultat: "OK" },
  { date: "18/04 08:55", user: "S. Kamga", role: "AMOA", action: "Validation", cible: "Rapport journalier RJ-2026-04-17", module: "Rapports", criticite: "Normale", resultat: "Approuvé" },
  { date: "18/04 08:45", user: "B. Ekambi", role: "MOEX", action: "Création", cible: "Rapport journalier RJ-2026-04-18", module: "Rapports", criticite: "Normale", resultat: "OK" },
  { date: "18/04 07:30", user: "Système", role: "Auto", action: "Alerte", cible: "Stock critique : Câble 2.5mm² rouge < seuil", module: "Stock", criticite: "Haute", resultat: "Notifié" },
  { date: "17/04 18:00", user: "Système", role: "Auto", action: "Relance", cible: "MOEX B. Ekambi — rapport non soumis avant 18h", module: "Rapports", criticite: "Haute", resultat: "Envoyé" },
  { date: "17/04 16:40", user: "F. Nkoulou", role: "SPOC", action: "Modification", cible: "Prospect P-2026-002 — budget mis à jour", module: "CRM", criticite: "Normale", resultat: "OK" },
  { date: "17/04 14:30", user: "P. Essomba", role: "AMOA", action: "Création", cible: "Demande d'achat DA-2026-009", module: "Achats", criticite: "Normale", resultat: "OK" },
  { date: "17/04 11:20", user: "Admin", role: "Admin", action: "Modification droits", cible: "Utilisateur Arc. Njoya — ajout module GED", module: "Utilisateurs", criticite: "Haute", resultat: "OK" },
  { date: "17/04 09:00", user: "Système", role: "Auto", action: "Alerte météo", cible: "Forte pluie prévue 19/04 — Douala", module: "Météo", criticite: "Haute", resultat: "Notifié" },
  { date: "16/04 15:30", user: "Marie Atangana", role: "SPOC", action: "Envoi facture", cible: "FAC-003 envoyée à J-P. Fouda", module: "Facturation", criticite: "Normale", resultat: "OK" },
  { date: "16/04 14:00", user: "S. Kamga", role: "AMOA", action: "Modification devis", cible: "Devis PRJ-001 — ajout ligne Lot III", module: "Devis", criticite: "Haute", resultat: "OK" },
  { date: "16/04 10:00", user: "Système", role: "Auto", action: "Alerte caméra", cible: "CAM-004 — flux RTSP interrompu depuis 2h", module: "Vidéo", criticite: "Critique", resultat: "Alerte active" },
];

// ═══════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Badge = ({ children, variant = "default", size = "sm" }) => {
  const styles = {
    default: { bg: C.primaryLight, color: C.primaryDark },
    success: { bg: C.successLight, color: C.successDark },
    warning: { bg: C.warningLight, color: C.warningDark },
    danger: { bg: C.dangerLight, color: C.dangerDark },
    info: { bg: C.infoLight, color: C.infoDark },
    purple: { bg: C.purpleLight, color: C.purpleDark },
    dark: { bg: "#F3F4F6", color: "#4B5563" },
    active: { bg: C.secondaryLight, color: C.secondaryDark },
    critical: { bg: "#7F1D1D", color: "#FEE2E2" },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: size === "xs" ? "1px 6px" : size === "lg" ? "5px 14px" : "3px 10px",
      borderRadius: 20, fontSize: size === "xs" ? 10 : size === "lg" ? 13 : 11,
      fontWeight: 600, backgroundColor: s.bg, color: s.color,
      letterSpacing: 0.3, whiteSpace: "nowrap",
    }}>{children}</span>
  );
};

const RoleBadge = ({ role }) => {
  const map = { SPOC: "default", AMOA: "active", MOE: "purple", MOEX: "warning", Client: "info", Admin: "dark", Auto: "dark" };
  return <Badge variant={map[role] || "dark"}>{role}</Badge>;
};

const StatusBadge = ({ statut }) => {
  const map = {
    "Actif": "success", "Inactif": "dark", "En attente": "warning", "En revue": "info",
    "Converti": "success", "Abandonné": "danger", "Brouillon": "dark", "En validation": "warning",
    "Opérationnel": "success", "Qualifié": "active", "En onboarding": "info", "Invité": "dark",
    "Suspendu": "danger", "À renforcer": "warning",
    "Bon": "success", "Attention": "warning", "Critique": "danger", "En attente": "dark",
    "Faible": "success", "Moyen": "warning", "Élevé": "danger",
  };
  return <Badge variant={map[statut] || "default"}>{statut}</Badge>;
};

const MaturiteBadge = ({ level }) => {
  const map = {
    "Référent": "success", "Confirmé": "active", "Autonome": "info",
    "Assisté": "warning", "Découverte": "dark", "—": "dark",
  };
  return <Badge variant={map[level] || "dark"} size="xs">{level}</Badge>;
};

const ScoreBar = ({ value, max = 100, height = 6, showLabel = false }) => {
  const pct = Math.min(100, (value / max) * 100);
  const color = pct >= 80 ? C.success : pct >= 50 ? C.primary : pct >= 30 ? C.warning : C.danger;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, background: "#F3F4F6", borderRadius: height, height, overflow: "hidden", minWidth: 60 }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: height, background: color, transition: "width 0.5s ease" }} />
      </div>
      {showLabel && <span style={{ fontSize: 11, fontWeight: 600, color, minWidth: 28, textAlign: "right" }}>{value}%</span>}
    </div>
  );
};

const KPICard = ({ icon: Icon, label, value, sub, trend, color = C.primary, accent, onClick }) => (
  <div onClick={onClick} style={{
    background: "#fff", borderRadius: 12, padding: "16px 18px",
    border: `1px solid ${C.border}`, flex: 1, minWidth: 160,
    display: "flex", flexDirection: "column", gap: 6,
    cursor: onClick ? "pointer" : "default",
    borderLeft: accent ? `3px solid ${accent}` : undefined,
    transition: "box-shadow 0.15s",
  }} onMouseEnter={e => onClick && (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)")}
     onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}12` }}>
        <Icon size={16} color={color} />
      </div>
      {trend !== undefined && (
        <span style={{ fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 2, color: trend >= 0 ? C.success : C.danger }}>
          {trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{Math.abs(trend)}%
        </span>
      )}
    </div>
    <div style={{ fontSize: 20, fontWeight: 800, color: C.dark, lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontSize: 11, color: C.gray, lineHeight: 1.3 }}>{label}</div>
    {sub && <div style={{ fontSize: 10, color: C.lightGray }}>{sub}</div>}
  </div>
);

const Card = ({ children, style: s, title, action, noPad }) => (
  <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", ...s }}>
    {title && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{title}</span>
        {action}
      </div>
    )}
    {!noPad && <div style={{ padding: title ? "14px 18px" : 18 }}>{children}</div>}
    {noPad && children}
  </div>
);

const MiniTable = ({ columns, data, maxH }) => (
  <div style={{ overflowX: "auto", maxHeight: maxH, overflowY: maxH ? "auto" : undefined }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: C.gray, fontSize: 10, letterSpacing: 0.5, textTransform: "uppercase", borderBottom: `1px solid ${C.border}`, background: C.bg, position: "sticky", top: 0, zIndex: 1 }}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: `1px solid ${C.borderLight}` }} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            {columns.map((col, ci) => (
              <td key={ci} style={{ padding: "8px 12px", color: C.darkGray }}>{col.render ? col.render(row) : row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Btn = ({ children, variant = "primary", size = "sm", icon: Icon, onClick }) => {
  const styles = {
    primary: { background: C.primary, color: "#fff", border: "none" },
    secondary: { background: C.bg, color: C.darkGray, border: `1px solid ${C.border}` },
    ghost: { background: "transparent", color: C.gray, border: "none" },
    danger: { background: C.danger, color: "#fff", border: "none" },
    outline: { background: "transparent", color: C.primary, border: `1px solid ${C.primary}` },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 5, borderRadius: 7, fontWeight: 600, cursor: "pointer", fontSize: size === "xs" ? 11 : 12, padding: size === "xs" ? "4px 8px" : "6px 14px", transition: "opacity 0.12s", ...s }}>
      {Icon && <Icon size={size === "xs" ? 12 : 14} />}{children}
    </button>
  );
};

const TabBar = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${C.border}`, marginBottom: 16 }}>
    {tabs.map(t => (
      <button key={t.key} onClick={() => onChange(t.key)} style={{
        padding: "9px 16px", fontSize: 12, fontWeight: active === t.key ? 700 : 500,
        color: active === t.key ? C.primary : C.gray,
        borderBottom: active === t.key ? `2px solid ${C.primary}` : "2px solid transparent",
        background: "none", border: "none", cursor: "pointer", marginBottom: -2, display: "flex", alignItems: "center", gap: 6,
      }}>
        {t.label}
        {t.count !== undefined && (
          <span style={{ fontSize: 10, fontWeight: 700, background: active === t.key ? C.primaryLight : "#F3F4F6", color: active === t.key ? C.primaryDark : C.gray, padding: "1px 7px", borderRadius: 10 }}>{t.count}</span>
        )}
      </button>
    ))}
  </div>
);

const AlertRow = ({ icon: Icon, text, sub, severity = "warning", time }) => {
  const colors = { critical: C.danger, warning: C.warning, info: C.info, success: C.success };
  const cl = colors[severity] || C.warning;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: `${cl}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
        <Icon size={14} color={cl} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{text}</div>
        {sub && <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{sub}</div>}
      </div>
      {time && <span style={{ fontSize: 10, color: C.lightGray, whiteSpace: "nowrap" }}>{time}</span>}
    </div>
  );
};

const Dot = ({ color = C.success, size = 7 }) => (
  <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0 }} />
);

const Avatar = ({ name, role, size = 32 }) => {
  const rs = ROLE_STYLES[role] || ROLE_STYLES.Client;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: rs.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, color: rs.color, flexShrink: 0 }}>
      {name?.charAt(0) || "?"}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 1. VUE GLOBALE ADMIN — Cockpit exécutif
// ═══════════════════════════════════════════════════════════════

const AdminDashboard = ({ onNav }) => {
  const alerts = [
    { icon: AlertTriangle, text: "Stock critique : Câble 2.5mm² rouge — 8 rouleaux (seuil : 4)", sub: "PRJ-001 — Impact potentiel sur Lot VII Électricité", severity: "warning", time: "08:30" },
    { icon: XCircle, text: "Caméra CAM-004 — flux RTSP interrompu depuis 14h", sub: "PRJ-001 — Zone arrière chantier non surveillée", severity: "critical", time: "16/04" },
    { icon: CloudSun, text: "Alerte météo : forte pluie prévue 19/04 à Douala", sub: "Impact possible sur coffrage poteaux R+1", severity: "warning", time: "17/04" },
    { icon: Clock, text: "Prospect P-2026-004 (Cécile Ngono) — 10 jours sans contact", sub: "Dernière action : envoi devis préliminaire", severity: "info", time: "08/04" },
    { icon: UserX, text: "Arc. Njoya (MOE) — score adoption 45%, onboarding incomplet", sub: "3 modules non maîtrisés — intervention suggérée", severity: "warning", time: "15/04" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>Centre de Gouvernance</h2>
          <p style={{ fontSize: 12, color: C.gray, margin: "4px 0 0" }}>Vue consolidée de la plateforme — 18 avril 2026</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn icon={Download} variant="secondary">Export</Btn>
          <Btn icon={RefreshCw} variant="secondary">Rafraîchir</Btn>
        </div>
      </div>

      {/* KPIs de tête */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
        <KPICard icon={Users} label="Prospects ce mois" value="7" sub="3 en attente · 2 en revue" trend={22} />
        <KPICard icon={Target} label="Taux conversion" value="43%" sub="YTD — 3 convertis / 7" color={C.warning} trend={-5} />
        <KPICard icon={Building2} label="Projets actifs" value="3" sub="1 exécution · 1 devis · 1 pré-faisabilité" color={C.secondary} />
        <KPICard icon={DollarSign} label="CA Pipeline" value="230M" sub="FCFA total" color={C.success} trend={12} />
        <KPICard icon={AlertTriangle} label="Alertes actives" value="5" sub="1 critique · 3 warning · 1 info" color={C.danger} accent={C.danger} />
        <KPICard icon={UserCheck} label="Utilisateurs actifs" value="8/10" sub="2 onboarding · 1 inactif" color={C.info} onClick={() => onNav("users")} />
      </div>

      {/* Row 2: Alerts + Pipeline */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Alertes & Actions urgentes */}
        <Card title="Alertes & Actions urgentes" action={<Badge variant="danger" size="xs">5 actives</Badge>} noPad>
          <div style={{ padding: "4px 18px 14px" }}>
            {alerts.map((a, i) => <AlertRow key={i} {...a} />)}
          </div>
        </Card>

        {/* Pipeline prospects */}
        <Card title="Pipeline Prospects" action={<Btn variant="ghost" size="xs" onClick={() => onNav("prospects")}>Voir tout <ChevronRight size={12} /></Btn>}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            {[
              { label: "En attente", count: 2, color: C.warning },
              { label: "En revue", count: 3, color: C.info },
              { label: "Convertis", count: 1, color: C.success },
              { label: "Abandonnés", count: 1, color: C.danger },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 8, background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.count}</div>
                <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Pipeline bar */}
          <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 10, marginBottom: 10 }}>
            <div style={{ width: "28%", background: C.warning }} title="En attente" />
            <div style={{ width: "43%", background: C.info }} title="En revue" />
            <div style={{ width: "15%", background: C.success }} title="Convertis" />
            <div style={{ width: "14%", background: C.danger }} title="Abandonnés" />
          </div>
          <div style={{ fontSize: 11, color: C.gray }}>Budget total pipeline : <strong style={{ color: C.dark }}>578M FCFA</strong> — Cycle moyen : <strong style={{ color: C.dark }}>18 jours</strong></div>
        </Card>
      </div>

      {/* Row 3: Projets + Utilisateurs à surveiller */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 16 }}>
        {/* Projets en cours */}
        <Card title="Projets en cours" action={<Btn variant="ghost" size="xs" onClick={() => onNav("projets")}>Tous les projets <ChevronRight size={12} /></Btn>} noPad>
          <div style={{ padding: "0 0 4px" }}>
            <MiniTable columns={[
              { key: "nom", label: "Projet", render: r => (
                <div>
                  <div style={{ fontWeight: 600, color: C.dark, fontSize: 12 }}>{r.nom}</div>
                  <div style={{ fontSize: 10, color: C.gray }}>{r.client} · {r.ville}</div>
                </div>
              )},
              { key: "phase", label: "Phase", render: r => <Badge variant={r.phase === "Exécution" ? "success" : r.phase === "Devis" ? "info" : "dark"}>{r.phase}</Badge> },
              { key: "avancement", label: "Avancement", render: r => <ScoreBar value={r.avancement} showLabel /> },
              { key: "sante", label: "Santé", render: r => <StatusBadge statut={r.sante} /> },
              { key: "budget", label: "Budget", render: r => (
                <div style={{ fontSize: 11 }}>
                  <div style={{ fontWeight: 600, color: C.dark }}>{(r.depense / 1000000).toFixed(0)}M / {(r.budget / 1000000).toFixed(0)}M</div>
                  <ScoreBar value={(r.depense / r.budget) * 100} height={4} />
                </div>
              )},
              { key: "alertes", label: "Alertes", render: r => r.alertes > 0 ? <Badge variant="danger" size="xs">{r.alertes}</Badge> : <span style={{ color: C.lightGray }}>—</span> },
            ]} data={ADMIN_PROJECTS} />
          </div>
        </Card>

        {/* Utilisateurs à surveiller */}
        <Card title="Utilisateurs à surveiller" action={<Btn variant="ghost" size="xs" onClick={() => onNav("users")}>Gérer <ChevronRight size={12} /></Btn>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {ADMIN_USERS.filter(u => u.scoreAdoption < 60 || u.statut === "Inactif" || u.incidents > 0).map((u, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                <Avatar name={u.nom} role={u.role} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{u.nom}</div>
                  <div style={{ fontSize: 10, color: C.gray }}>{u.role} · Adoption: {u.scoreAdoption}%</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                  <MaturiteBadge level={u.maturite} />
                  {u.incidents > 0 && <span style={{ fontSize: 10, color: C.danger }}>{u.incidents} incident{u.incidents > 1 ? "s" : ""}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 4: Activité récente + Synthèse IA */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Activité récente" action={<Btn variant="ghost" size="xs" onClick={() => onNav("audit")}>Journal complet <ChevronRight size={12} /></Btn>} noPad>
          <div style={{ padding: "0 0 4px" }}>
            <MiniTable columns={[
              { key: "date", label: "Date", render: r => <span style={{ fontFamily: "monospace", fontSize: 10, color: C.gray }}>{r.date}</span> },
              { key: "user", label: "Utilisateur", render: r => <span style={{ fontWeight: 600, fontSize: 11 }}>{r.user}</span> },
              { key: "role", label: "Rôle", render: r => <RoleBadge role={r.role} /> },
              { key: "action", label: "Action", render: r => <span style={{ fontSize: 11 }}>{r.action}</span> },
              { key: "cible", label: "Objet", render: r => <span style={{ fontSize: 11, color: C.gray, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{r.cible}</span> },
            ]} data={AUDIT_LOGS.slice(0, 6)} maxH={240} />
          </div>
        </Card>

        {/* Synthèse IA Admin */}
        <Card style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.dark2} 100%)`, borderColor: C.dark }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `${C.primary}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Brain size={16} color={C.primary} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Synthèse IA — Administration</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Analyse automatique · 18/04/2026 09:00</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: CheckCircle2, text: "Le projet PRJ-001 progresse conformément au planning. Prochain jalon : plancher R+1 le 25/04.", color: C.success },
              { icon: AlertTriangle, text: "Le prospect Cécile Ngono (P-2026-004) est sans contact depuis 10 jours. Relance recommandée sous 48h.", color: C.warning },
              { icon: AlertCircle, text: "Arc. Njoya (MOE) présente un score d'adoption de 45%. Recommandation : session d'onboarding GED + Planning.", color: C.warning },
              { icon: TrendingDown, text: "Le taux de conversion prospects a baissé de 5% ce mois. Analyse : 2 leads mal qualifiés (source réseaux sociaux).", color: C.danger },
              { icon: ShieldCheck, text: "Conformité d'exploitation : 94% des rapports chantier soumis dans les délais (<24h). Objectif atteint.", color: C.success },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <item.icon size={14} color={item.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 5: Santé plateforme */}
      <Card title="Santé de la plateforme">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {[
            { label: "Disponibilité API", value: "99.8%", status: "success" },
            { label: "Sync Odoo", value: "OK", status: "success" },
            { label: "Caméras actives", value: "3/4", status: "warning" },
            { label: "Rapports < 24h", value: "94%", status: "success" },
            { label: "Onboarding complet", value: "60%", status: "warning" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 8px", borderRadius: 8, background: C.bg }}>
              <Dot color={item.status === "success" ? C.success : item.status === "warning" ? C.warning : C.danger} />
              <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginTop: 6 }}>{item.value}</div>
              <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. UTILISATEURS — Centre de gestion avancé
// ═══════════════════════════════════════════════════════════════

const AdminUsersPage = () => {
  const [tab, setTab] = useState("tous");
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = useMemo(() => {
    if (tab === "tous") return ADMIN_USERS;
    if (tab === "arisque") return ADMIN_USERS.filter(u => u.scoreAdoption < 60 || u.incidents > 0 || u.statut === "Inactif");
    if (tab === "onboarding") return ADMIN_USERS.filter(u => ["Invité", "En onboarding"].includes(u.statutOnboarding));
    return ADMIN_USERS.filter(u => u.role.toLowerCase() === tab);
  }, [tab]);

  const UserDetail = ({ user }) => (
    <div style={{ position: "fixed", top: 0, right: 0, width: 480, height: "100vh", background: "#fff", borderLeft: `1px solid ${C.border}`, zIndex: 100, overflowY: "auto", boxShadow: "-4px 0 20px rgba(0,0,0,0.08)" }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bg }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>Fiche utilisateur</span>
        <button onClick={() => setSelectedUser(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.gray} /></button>
      </div>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar name={user.nom} role={user.role} size={48} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.dark }}>{user.nom}</div>
            <div style={{ fontSize: 12, color: C.gray }}>{user.email}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              <RoleBadge role={user.role} />
              <StatusBadge statut={user.statut} />
            </div>
          </div>
        </div>

        {/* Qualification */}
        <div style={{ background: C.bg, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 10 }}>Qualification & Habilitation</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><span style={{ fontSize: 10, color: C.gray }}>Onboarding</span><div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}><StatusBadge statut={user.statutOnboarding} /></div></div>
            <div><span style={{ fontSize: 10, color: C.gray }}>Maturité</span><div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}><MaturiteBadge level={user.maturite} /></div></div>
            <div><span style={{ fontSize: 10, color: C.gray }}>Score adoption</span><div style={{ marginTop: 4 }}><ScoreBar value={user.scoreAdoption} showLabel /></div></div>
            <div><span style={{ fontSize: 10, color: C.gray }}>Projets affectés</span><div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginTop: 2 }}>{user.projets}</div></div>
          </div>
        </div>

        {/* Habilitations */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Modules autorisés</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {user.habilitations.length > 0 ? user.habilitations.map((h, i) => <Badge key={i} variant="success" size="xs">{h}</Badge>) : <span style={{ fontSize: 11, color: C.lightGray }}>Aucun module attribué</span>}
          </div>
        </div>

        {user.modulesArenforcer.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.warning, marginBottom: 8 }}>Modules à renforcer</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {user.modulesArenforcer.map((m, i) => <Badge key={i} variant="warning" size="xs">{m}</Badge>)}
            </div>
          </div>
        )}

        {/* Activity stats */}
        <div style={{ background: C.bg, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 10 }}>Activité récente</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, textAlign: "center" }}>
            <div><div style={{ fontSize: 18, fontWeight: 800, color: C.dark }}>{user.actionsRecentes}</div><div style={{ fontSize: 10, color: C.gray }}>Actions (7j)</div></div>
            <div><div style={{ fontSize: 18, fontWeight: 800, color: user.incidents > 0 ? C.danger : C.success }}>{user.incidents}</div><div style={{ fontSize: 10, color: C.gray }}>Incidents</div></div>
            <div><div style={{ fontSize: 10, fontFamily: "monospace", color: C.gray, marginTop: 4 }}>{user.derniereConnexion}</div><div style={{ fontSize: 10, color: C.gray }}>Dern. connexion</div></div>
          </div>
        </div>

        {/* Actions admin */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Actions administrateur</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <Btn icon={Edit} variant="secondary" size="xs">Modifier rôle</Btn>
            <Btn icon={Building2} variant="secondary" size="xs">Affecter projet</Btn>
            <Btn icon={GraduationCap} variant="secondary" size="xs">Lancer onboarding</Btn>
            <Btn icon={RefreshCw} variant="secondary" size="xs">Réinit. mot de passe</Btn>
            <Btn icon={Lock} variant="secondary" size="xs">Modifier habilitations</Btn>
            {user.statut === "Actif" ? (
              <Btn icon={UserX} variant="danger" size="xs">Suspendre</Btn>
            ) : (
              <Btn icon={Unlock} variant="outline" size="xs">Réactiver</Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>Gestion des Utilisateurs</h2>
          <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Administration, qualification et habilitation des comptes</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn icon={Download} variant="secondary">Export</Btn>
          <Btn icon={Plus}>Nouvel utilisateur</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
        <KPICard icon={Users} label="Utilisateurs actifs" value="8" sub="sur 10 comptes" color={C.primary} />
        <KPICard icon={Users} label="SPOC" value="2" color={C.primary} />
        <KPICard icon={Briefcase} label="AMOA" value="2" color={C.secondary} />
        <KPICard icon={HardHat} label="MOE / MOEX" value="2" sub="1 MOE + 1 MOEX" color={C.purple} />
        <KPICard icon={Home} label="Clients" value="3" color={C.info} />
        <KPICard icon={AlertTriangle} label="À surveiller" value="4" sub="Adoption < 60% ou incidents" color={C.danger} accent={C.danger} />
      </div>

      {/* Onboarding funnel */}
      <Card title="Entonnoir d'onboarding">
        <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
          {[
            { label: "Invité", count: 1, color: C.lightGray },
            { label: "En onboarding", count: 2, color: C.info },
            { label: "Qualifié", count: 2, color: C.primary },
            { label: "Opérationnel", count: 3, color: C.success },
            { label: "Suspendu", count: 1, color: C.danger },
          ].map((step, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "12px 6px", position: "relative", background: `${step.color}08` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: step.color }}>{step.count}</div>
              <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{step.label}</div>
              {i < 4 && <ChevronRight size={16} color={C.faintGray} style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />}
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs + Table */}
      <TabBar tabs={[
        { key: "tous", label: "Tous", count: ADMIN_USERS.length },
        { key: "arisque", label: "À surveiller", count: ADMIN_USERS.filter(u => u.scoreAdoption < 60 || u.incidents > 0 || u.statut === "Inactif").length },
        { key: "onboarding", label: "Onboarding", count: ADMIN_USERS.filter(u => ["Invité", "En onboarding"].includes(u.statutOnboarding)).length },
        { key: "spoc", label: "SPOC", count: ADMIN_USERS.filter(u => u.role === "SPOC").length },
        { key: "amoa", label: "AMOA", count: ADMIN_USERS.filter(u => u.role === "AMOA").length },
        { key: "moe", label: "MOE", count: ADMIN_USERS.filter(u => u.role === "MOE").length },
        { key: "moex", label: "MOEX", count: ADMIN_USERS.filter(u => u.role === "MOEX").length },
        { key: "client", label: "Clients", count: ADMIN_USERS.filter(u => u.role === "Client").length },
      ]} active={tab} onChange={setTab} />

      <Card noPad>
        <MiniTable columns={[
          { key: "nom", label: "Utilisateur", render: r => (
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setSelectedUser(r)}>
              <Avatar name={r.nom} role={r.role} size={30} />
              <div>
                <div style={{ fontWeight: 600, color: C.dark, fontSize: 12 }}>{r.nom}</div>
                <div style={{ fontSize: 10, color: C.gray }}>{r.email}</div>
              </div>
            </div>
          )},
          { key: "role", label: "Rôle", render: r => (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <RoleBadge role={r.role} />
              {r.rolesSecondaires.length > 0 && <span style={{ fontSize: 9, color: C.lightGray }}>+{r.rolesSecondaires.join(", ")}</span>}
            </div>
          )},
          { key: "projets", label: "Projets", render: r => <span style={{ fontWeight: 600 }}>{r.projets}</span> },
          { key: "statut", label: "Compte", render: r => <StatusBadge statut={r.statut} /> },
          { key: "statutOnboarding", label: "Onboarding", render: r => <StatusBadge statut={r.statutOnboarding} /> },
          { key: "maturite", label: "Maturité", render: r => <MaturiteBadge level={r.maturite} /> },
          { key: "scoreAdoption", label: "Adoption", render: r => <ScoreBar value={r.scoreAdoption} showLabel /> },
          { key: "incidents", label: "Incidents", render: r => r.incidents > 0 ? <Badge variant="danger" size="xs">{r.incidents}</Badge> : <span style={{ color: C.lightGray }}>0</span> },
          { key: "derniereConnexion", label: "Dern. connexion", render: r => <span style={{ fontSize: 10, fontFamily: "monospace", color: C.gray }}>{r.derniereConnexion}</span> },
          { key: "actions", label: "", render: r => (
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => setSelectedUser(r)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><Eye size={14} color={C.gray} /></button>
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><Edit size={14} color={C.gray} /></button>
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><Lock size={14} color={C.gray} /></button>
            </div>
          )},
        ]} data={filtered} />
      </Card>

      {selectedUser && <UserDetail user={selectedUser} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. PROSPECTS / CRM ADMIN
// ═══════════════════════════════════════════════════════════════

const AdminProspectsPage = () => {
  const [view, setView] = useState("liste");

  const KanbanColumn = ({ title, prospects, color }) => (
    <div style={{ flex: 1, minWidth: 220 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, padding: "0 4px" }}>
        <Dot color={color} size={8} />
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{title}</span>
        <Badge variant="dark" size="xs">{prospects.length}</Badge>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {prospects.map((p, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 12, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{p.nom}</div>
            <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{p.type} · {p.bien} · {p.region}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.dark }}>{p.budget}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={10} color={C.warning} fill={p.score >= 80 ? C.warning : "none"} />
                <span style={{ fontSize: 10, fontWeight: 600, color: p.score >= 80 ? C.success : p.score >= 50 ? C.warning : C.danger }}>{p.score}</span>
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.lightGray, marginTop: 6 }}>SPOC: {p.spoc} · {p.delaiSansContact > 7 ? <span style={{ color: C.danger }}>{p.delaiSansContact}j sans contact</span> : `${p.delaiSansContact}j`}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>CRM — Vue Admin consolidée</h2>
          <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Pipeline commercial, affectations et qualité de qualification</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant={view === "liste" ? "primary" : "secondary"} size="xs" onClick={() => setView("liste")}>Liste</Btn>
          <Btn variant={view === "kanban" ? "primary" : "secondary"} size="xs" onClick={() => setView("kanban")}>Kanban</Btn>
          <Btn variant={view === "stats" ? "primary" : "secondary"} size="xs" onClick={() => setView("stats")}>Stats</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
        <KPICard icon={Users} label="Total prospects" value="7" trend={22} />
        <KPICard icon={Target} label="Taux conversion" value="14%" sub="1 converti / 7" color={C.warning} />
        <KPICard icon={DollarSign} label="Pipeline total" value="578M" sub="FCFA" color={C.success} />
        <KPICard icon={Clock} label="Cycle moyen" value="18j" sub="formulaire → conversion" color={C.info} />
        <KPICard icon={AlertTriangle} label="Leads stagnants" value="2" sub="> 7 jours sans contact" color={C.danger} accent={C.danger} />
        <KPICard icon={FileWarning} label="Qualité remplissage" value="76%" sub="Moyenne fiches" color={C.purple} />
      </div>

      {/* Anomalies CRM */}
      <Card title="Anomalies CRM" action={<Badge variant="warning" size="xs">3 détectées</Badge>}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <AlertRow icon={UserX} text="Prospect Franck Mbarga (P-2026-005) — pas de SPOC affecté" sub="Source : Réseaux sociaux · Qualité remplissage : 45%" severity="critical" time="15/04" />
          <AlertRow icon={Clock} text="Prospect Cécile Ngono (P-2026-004) — 10 jours sans contact" sub="SPOC: Marie Atangana · Score: 71" severity="warning" time="08/04" />
          <AlertRow icon={AlertCircle} text="Prospect Hélène Mbouda (P-2026-007) — abandonnée après 3 relances" sub="SPOC: Fabien Nkoulou · 21 jours sans réponse" severity="info" time="25/03" />
        </div>
      </Card>

      {/* Views */}
      {view === "liste" && (
        <Card noPad>
          <MiniTable columns={[
            { key: "id", label: "Réf.", render: r => <span style={{ fontSize: 10, fontFamily: "monospace", color: C.gray }}>{r.id}</span> },
            { key: "nom", label: "Prospect", render: r => <span style={{ fontWeight: 600, color: C.dark, fontSize: 12 }}>{r.nom}</span> },
            { key: "type", label: "Type", render: r => <span style={{ fontSize: 11 }}>{r.type}</span> },
            { key: "region", label: "Ville", render: r => <span style={{ fontSize: 11 }}>{r.region}</span> },
            { key: "budget", label: "Budget", render: r => <span style={{ fontWeight: 600, fontSize: 11 }}>{r.budget}</span> },
            { key: "statut", label: "Statut", render: r => <StatusBadge statut={r.statut} /> },
            { key: "score", label: "Score", render: r => <ScoreBar value={r.score} showLabel /> },
            { key: "spoc", label: "SPOC", render: r => r.spoc === "—" ? <Badge variant="danger" size="xs">Non affecté</Badge> : <span style={{ fontSize: 11 }}>{r.spoc}</span> },
            { key: "qualiteRemplissage", label: "Qualité fiche", render: r => <ScoreBar value={r.qualiteRemplissage} showLabel /> },
            { key: "delaiSansContact", label: "Dern. contact", render: r => (
              <span style={{ fontSize: 11, color: r.delaiSansContact > 7 ? C.danger : r.delaiSansContact > 3 ? C.warning : C.gray, fontWeight: r.delaiSansContact > 7 ? 600 : 400 }}>
                {r.delaiSansContact === 0 ? "Aujourd'hui" : `il y a ${r.delaiSansContact}j`}
              </span>
            )},
            { key: "financement", label: "Financement" },
            { key: "source", label: "Source", render: r => <Badge variant="dark" size="xs">{r.source}</Badge> },
          ]} data={ADMIN_PROSPECTS} />
        </Card>
      )}

      {view === "kanban" && (
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 10 }}>
          <KanbanColumn title="En attente" prospects={ADMIN_PROSPECTS.filter(p => p.statut === "En attente")} color={C.warning} />
          <KanbanColumn title="En revue" prospects={ADMIN_PROSPECTS.filter(p => p.statut === "En revue")} color={C.info} />
          <KanbanColumn title="Convertis" prospects={ADMIN_PROSPECTS.filter(p => p.statut === "Converti")} color={C.success} />
          <KanbanColumn title="Abandonnés" prospects={ADMIN_PROSPECTS.filter(p => p.statut === "Abandonné")} color={C.danger} />
        </div>
      )}

      {view === "stats" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card title="Répartition par source">
            {[
              { source: "Site web", count: 3, pct: 43 },
              { source: "Recommandation", count: 1, pct: 14 },
              { source: "Événement diaspora", count: 1, pct: 14 },
              { source: "Réseaux sociaux", count: 1, pct: 14 },
              { source: "Partenaire Connect", count: 1, pct: 14 },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                <span style={{ fontSize: 12, color: C.dark, flex: 1 }}>{s.source}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{s.count}</span>
                <div style={{ width: 80 }}><ScoreBar value={s.pct} /></div>
              </div>
            ))}
          </Card>
          <Card title="Performance par SPOC">
            {[
              { spoc: "Marie Atangana", leads: 4, conversion: "25%", cycleMoyen: "14j", qualite: 92 },
              { spoc: "Fabien Nkoulou", leads: 2, conversion: "0%", cycleMoyen: "—", qualite: 68 },
              { spoc: "Non affecté", leads: 1, conversion: "—", cycleMoyen: "—", qualite: 45 },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                <Avatar name={s.spoc} role="SPOC" size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{s.spoc}</div>
                  <div style={{ fontSize: 10, color: C.gray }}>{s.leads} leads · Conv: {s.conversion} · Cycle: {s.cycleMoyen}</div>
                </div>
                <ScoreBar value={s.qualite} showLabel />
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. PROJETS — Pilotage portefeuille
// ═══════════════════════════════════════════════════════════════

const AdminProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const ProjectDetail = ({ project: p }) => (
    <div style={{ position: "fixed", top: 0, right: 0, width: 520, height: "100vh", background: "#fff", borderLeft: `1px solid ${C.border}`, zIndex: 100, overflowY: "auto", boxShadow: "-4px 0 20px rgba(0,0,0,0.08)" }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bg }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>Synthèse Projet</span>
        <button onClick={() => setSelectedProject(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.gray} /></button>
      </div>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.dark }}>{p.nom}</div>
          <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{p.id} · {p.type} · {p.ville}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <StatusBadge statut={p.phase} />
            <StatusBadge statut={p.sante} />
            <Badge variant={p.risque === "Faible" ? "success" : p.risque === "Moyen" ? "warning" : "danger"} size="xs">Risque: {p.risque}</Badge>
          </div>
        </div>

        {/* Acteurs */}
        <div style={{ background: C.bg, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Acteurs</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { role: "Client", name: p.client },
              { role: "SPOC", name: p.spoc },
              { role: "AMOA", name: p.amoa },
              { role: "MOEX", name: p.moex },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar name={a.name} role={a.role} size={24} />
                <div>
                  <div style={{ fontSize: 10, color: C.gray }}>{a.role}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.dark }}>{a.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget & Avancement */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: C.bg, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: C.gray }}>Budget</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginTop: 4 }}>{(p.budget / 1000000).toFixed(0)}M</div>
            <div style={{ fontSize: 10, color: C.gray }}>Dépensé: {(p.depense / 1000000).toFixed(1)}M ({Math.round(p.depense / p.budget * 100)}%)</div>
            <ScoreBar value={p.depense / p.budget * 100} height={5} />
          </div>
          <div style={{ background: C.bg, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: C.gray }}>Avancement</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginTop: 4 }}>{p.avancement}%</div>
            <ScoreBar value={p.avancement} height={5} />
            <div style={{ fontSize: 10, color: C.gray, marginTop: 4 }}>Prochain : {p.prochainJalon}</div>
          </div>
        </div>

        {/* Validations */}
        {p.validationsEnAttente > 0 && (
          <div style={{ background: C.warningLight, borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.warningDark }}>
              <Clock size={12} style={{ marginRight: 4 }} />{p.validationsEnAttente} validation{p.validationsEnAttente > 1 ? "s" : ""} en attente
            </div>
          </div>
        )}

        {/* Alertes */}
        {p.alertes > 0 && (
          <div style={{ background: C.dangerLight, borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dangerDark }}>
              <AlertTriangle size={12} style={{ marginRight: 4 }} />{p.alertes} alerte{p.alertes > 1 ? "s" : ""} active{p.alertes > 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>Portefeuille Projets</h2>
          <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Vision consolidée des projets actifs et en préparation</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn icon={Filter} variant="secondary">Filtres</Btn>
          <Btn icon={Download} variant="secondary">Export</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        <KPICard icon={Building2} label="Projets actifs" value="3" color={C.primary} />
        <KPICard icon={DollarSign} label="Budget total" value="230M" sub="FCFA" color={C.success} />
        <KPICard icon={DollarSign} label="Dépensé total" value="54.9M" sub="FCFA (24%)" color={C.warning} />
        <KPICard icon={AlertTriangle} label="Alertes projet" value="3" color={C.danger} accent={C.danger} />
        <KPICard icon={Clock} label="Valid. en attente" value="4" color={C.info} />
      </div>

      {/* Phase distribution */}
      <Card title="Répartition par phase">
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { phase: "Pré-faisabilité", count: 1, color: C.lightGray },
            { phase: "Devis", count: 1, color: C.info },
            { phase: "Exécution", count: 1, color: C.success },
            { phase: "Clos", count: 0, color: C.dark },
          ].map((p, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: 12, borderRadius: 8, background: `${p.color}08`, border: `1px solid ${p.color}20` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: p.color }}>{p.count}</div>
              <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{p.phase}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Project Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ADMIN_PROJECTS.map((p, i) => (
          <div key={i} onClick={() => setSelectedProject(p)} style={{
            background: "#fff", borderRadius: 12, padding: 18, border: `1px solid ${C.border}`,
            borderLeft: `4px solid ${p.sante === "Bon" ? C.success : p.sante === "Attention" ? C.warning : C.lightGray}`,
            cursor: "pointer", transition: "box-shadow 0.15s",
          }} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"}
             onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: C.gray }}>{p.id}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{p.nom}</span>
                </div>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>
                  {p.client} · {p.type} · {p.ville} · SPOC: {p.spoc}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <StatusBadge statut={p.phase} />
                <StatusBadge statut={p.sante} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 14, marginTop: 14 }}>
              <div>
                <div style={{ fontSize: 10, color: C.gray }}>Avancement</div>
                <div style={{ marginTop: 4 }}><ScoreBar value={p.avancement} showLabel /></div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.gray }}>Budget</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginTop: 2 }}>{(p.budget / 1000000).toFixed(0)}M</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.gray }}>Dépensé</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: p.depense / p.budget > 0.5 ? C.warning : C.dark, marginTop: 2 }}>{(p.depense / 1000000).toFixed(1)}M ({Math.round(p.depense / p.budget * 100)}%)</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.gray }}>Prochain jalon</div>
                <div style={{ fontSize: 11, color: C.dark, marginTop: 2, fontWeight: 500 }}>{p.prochainJalon}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.gray }}>Alertes / Valid.</div>
                <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                  {p.alertes > 0 && <Badge variant="danger" size="xs">{p.alertes} alerte{p.alertes > 1 ? "s" : ""}</Badge>}
                  {p.validationsEnAttente > 0 && <Badge variant="warning" size="xs">{p.validationsEnAttente} valid.</Badge>}
                  {p.alertes === 0 && p.validationsEnAttente === 0 && <span style={{ color: C.lightGray, fontSize: 11 }}>RAS</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && <ProjectDetail project={selectedProject} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. PARAMÉTRAGE — Centre de configuration structuré
// ═══════════════════════════════════════════════════════════════

const AdminParametragePage = () => {
  const [activeSection, setActiveSection] = useState("referentiels");

  const sections = [
    { key: "referentiels", label: "Référentiels métier", icon: Database, items: [
      { title: "Articles & Matériaux", desc: "Base centralisée des articles chantier", count: "156 articles", color: C.primary },
      { title: "Lots standards", desc: "Templates de lots par type de projet", count: "9 lots", color: C.primary },
      { title: "Typologies projet", desc: "Villa, Duplex, Immeuble, Rénovation, etc.", count: "6 types", color: C.primary },
      { title: "Niveaux de finition", desc: "Base, Gamme moyenne, Haut de gamme", count: "3 niveaux", color: C.primary },
      { title: "Main d'œuvre", desc: "Corps de métier, niveaux, coûts journaliers", count: "18 postes", color: C.primary },
      { title: "Fournisseurs", desc: "Fournisseurs référencés et KPI associés", count: "23 fournisseurs", color: C.primary },
    ]},
    { key: "crm", label: "Paramétrage CRM", icon: Users, items: [
      { title: "Formulaire prospect", desc: "Champs, règles conditionnelles, mapping Odoo", count: "12 champs", color: C.info },
      { title: "Scoring prospects", desc: "Règles de scoring automatique par critères", count: "8 règles", color: C.info },
      { title: "Statuts pipeline", desc: "Étapes du pipeline commercial", count: "5 statuts", color: C.info },
      { title: "Règles d'affectation SPOC", desc: "Attribution automatique par zone/type", count: "4 règles", color: C.info },
    ]},
    { key: "projets", label: "Paramétrage projets", icon: Building2, items: [
      { title: "Templates planning", desc: "Modèles par type de construction", count: "4 modèles", color: C.secondary },
      { title: "Jalons standards", desc: "Jalons obligatoires par phase", count: "12 jalons", color: C.secondary },
      { title: "Phases projet", desc: "Pré-faisabilité → Exécution → Clos", count: "5 phases", color: C.secondary },
      { title: "Règles de passage", desc: "Conditions pour avancer entre phases", count: "8 règles", color: C.secondary },
      { title: "Règles de validation", desc: "Circuits d'approbation par type d'action", count: "15 circuits", color: C.secondary },
    ]},
    { key: "meteo", label: "Météo chantier", icon: CloudSun, items: [
      { title: "Seuils par tâche", desc: "Conditions météo limitant l'exécution", count: "4 seuils", color: C.warning },
      { title: "Couleurs d'alerte", desc: "Jaune, Orange, Rouge par type de risque", count: "3 niveaux", color: C.warning },
      { title: "Impact chantier", desc: "Règles d'arrêt / reprise automatiques", count: "6 scénarios", color: C.warning },
    ]},
    { key: "video", label: "Vidéosurveillance", icon: Camera, items: [
      { title: "Caméras RTSP", desc: "Configuration flux vidéo par chantier", count: "4 caméras", color: C.purple },
      { title: "Zones surveillées", desc: "Délimitation et nommage des zones", count: "6 zones", color: C.purple },
      { title: "Plages horaires", desc: "Heures d'enregistrement et détection", count: "2 plages", color: C.purple },
      { title: "Alertes activité", desc: "Détection mouvement hors heures", count: "3 règles", color: C.purple },
    ]},
    { key: "workflows", label: "Workflows & Notifications", icon: Send, items: [
      { title: "Circuits de validation", desc: "Qui valide quoi, par rôle et module", count: "18 workflows", color: C.primary },
      { title: "Escalades", desc: "Délais et destinataires de relance", count: "6 règles", color: C.primary },
      { title: "Canaux de notification", desc: "Email, SMS, Push, In-app", count: "4 canaux", color: C.primary },
      { title: "SLA & Rappels", desc: "Délais maximum par type d'action", count: "12 SLA", color: C.primary },
    ]},
    { key: "securite", label: "Sécurité & Accès", icon: Shield, items: [
      { title: "Rôles", desc: "Admin, SPOC, AMOA, MOE, MOEX, Client", count: "6 rôles", color: C.danger },
      { title: "Permissions", desc: "Matrice de droits par rôle et module", count: "72 permissions", color: C.danger },
      { title: "Habilitations sensibles", desc: "Actions nécessitant validation admin", count: "8 actions", color: C.danger },
      { title: "Restrictions par module", desc: "Accès conditionnel selon qualification", count: "Actif", color: C.danger },
    ]},
    { key: "onboarding", label: "Onboarding & Qualification", icon: GraduationCap, items: [
      { title: "Parcours par rôle", desc: "Étapes d'onboarding adaptées à chaque rôle", count: "6 parcours", color: C.success },
      { title: "Modules obligatoires", desc: "Formations requises avant habilitation", count: "12 modules", color: C.success },
      { title: "Quiz & Checklists", desc: "Validations de prise en main", count: "8 quiz", color: C.success },
      { title: "Niveaux de qualification", desc: "Découverte → Référent", count: "5 niveaux", color: C.success },
      { title: "Règles de montée", desc: "Conditions d'évolution entre niveaux", count: "10 règles", color: C.success },
      { title: "Seuils d'alerte usage", desc: "Détection d'usage insuffisant par module", count: "Actif", color: C.success },
    ]},
    { key: "systeme", label: "Système & Intégrations", icon: Zap, items: [
      { title: "Intégrations API", desc: "Odoo, Connect (paiement), Firebase, SMTP", count: "4 intégrations", color: C.darkGray },
      { title: "Jours ouvrés & Fériés", desc: "Calendrier configurable par pays/projet", count: "Cameroun", color: C.darkGray },
      { title: "Devises & Taux", desc: "FCFA, EUR, conversions automatiques", count: "2 devises", color: C.darkGray },
    ]},
  ];

  const activeItems = sections.find(s => s.key === activeSection)?.items || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>Centre de Paramétrage</h2>
        <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Configuration et référentiels structurants de la plateforme</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map(s => (
            <button key={s.key} onClick={() => setActiveSection(s.key)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8,
              background: activeSection === s.key ? C.primaryLight : "transparent",
              color: activeSection === s.key ? C.primaryDark : C.gray,
              border: "none", cursor: "pointer", fontSize: 12, fontWeight: activeSection === s.key ? 700 : 500,
              textAlign: "left", width: "100%",
            }}>
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {activeItems.map((item, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${C.border}`,
              cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, transition: "box-shadow 0.15s",
            }} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"}
               onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: `${item.color}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Settings size={16} color={item.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{item.title}</div>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{item.desc}</div>
                <div style={{ fontSize: 10, color: C.lightGray, marginTop: 4 }}>{item.count}</div>
              </div>
              <ChevronRight size={14} color={C.lightGray} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. AUDIT & LOGS — Centre de contrôle et conformité
// ═══════════════════════════════════════════════════════════════

const AdminAuditPage = () => {
  const [filterRole, setFilterRole] = useState("Tous");
  const [filterCriticite, setFilterCriticite] = useState("Toutes");

  const filtered = useMemo(() => {
    let data = AUDIT_LOGS;
    if (filterRole !== "Tous") data = data.filter(l => l.role === filterRole);
    if (filterCriticite !== "Toutes") data = data.filter(l => l.criticite === filterCriticite);
    return data;
  }, [filterRole, filterCriticite]);

  const anomalies = [
    { text: "Compte inactif avec droits élevés : Ex. Ateba (MOE)", sub: "3 incidents passés · Dernière connexion: 02/01/2026", severity: "critical" },
    { text: "Caméra CAM-004 déconnectée depuis > 24h", sub: "Zone arrière chantier PRJ-001 non couverte", severity: "critical" },
    { text: "Arc. Njoya — accès GED + Planning non maîtrisé malgré habilitation", sub: "Score adoption 45% — Onboarding incomplet", severity: "warning" },
    { text: "Modification devis PRJ-001 par AMOA sans validation SPOC préalable", sub: "Action le 16/04 à 10:20 — Workflow non respecté", severity: "warning" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>Audit, Conformité & Logs</h2>
          <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Traçabilité, anomalies et contrôle de conformité</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn icon={Download} variant="secondary">Export CSV</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
        <KPICard icon={Activity} label="Actions (7j)" value="87" color={C.primary} />
        <KPICard icon={ShieldAlert} label="Actions critiques" value="4" sub="Modifications droits, suppressions" color={C.danger} accent={C.danger} />
        <KPICard icon={RefreshCw} label="Alertes système" value="6" sub="Météo, stock, caméras" color={C.warning} />
        <KPICard icon={CheckCircle2} label="Validations sensibles" value="12" color={C.success} />
        <KPICard icon={XCircle} label="Erreurs / Échecs" value="1" sub="Flux RTSP interrompu" color={C.danger} />
      </div>

      {/* Anomalies */}
      <Card title="Anomalies détectées" action={<Badge variant="danger" size="xs">{anomalies.length}</Badge>}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {anomalies.map((a, i) => (
            <AlertRow key={i} icon={a.severity === "critical" ? ShieldAlert : AlertTriangle} text={a.text} sub={a.sub} severity={a.severity} />
          ))}
        </div>
      </Card>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.gray }}>Filtres :</span>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 12, color: C.darkGray, background: "#fff" }}>
          {["Tous", "SPOC", "AMOA", "MOEX", "MOE", "Admin", "Auto"].map(r => <option key={r}>{r}</option>)}
        </select>
        <select value={filterCriticite} onChange={e => setFilterCriticite(e.target.value)} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 12, color: C.darkGray, background: "#fff" }}>
          {["Toutes", "Critique", "Haute", "Normale", "Info"].map(c => <option key={c}>{c}</option>)}
        </select>
        <span style={{ fontSize: 11, color: C.lightGray }}>{filtered.length} résultats</span>
      </div>

      {/* Log table */}
      <Card noPad>
        <MiniTable columns={[
          { key: "date", label: "Date/Heure", render: r => <span style={{ fontFamily: "monospace", fontSize: 10, color: C.gray }}>{r.date}</span> },
          { key: "user", label: "Utilisateur", render: r => (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Avatar name={r.user} role={r.role} size={22} />
              <span style={{ fontWeight: 600, fontSize: 11 }}>{r.user}</span>
            </div>
          )},
          { key: "role", label: "Rôle", render: r => <RoleBadge role={r.role} /> },
          { key: "action", label: "Action", render: r => {
            const v = { "Création": "success", "Validation": "active", "Modification": "info", "Alerte": "warning", "Suppression": "danger", "Modification droits": "danger", "Envoi facture": "info", "Modification devis": "warning", "Alerte météo": "warning", "Alerte caméra": "danger", "Relance": "warning", "Connexion": "dark" };
            return <Badge variant={v[r.action] || "dark"} size="xs">{r.action}</Badge>;
          }},
          { key: "cible", label: "Objet / Cible", render: r => <span style={{ fontSize: 11, color: C.gray, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{r.cible}</span> },
          { key: "module", label: "Module", render: r => <Badge variant="dark" size="xs">{r.module}</Badge> },
          { key: "criticite", label: "Criticité", render: r => {
            const v = { "Critique": "critical", "Haute": "danger", "Normale": "dark", "Info": "info" };
            return <Badge variant={v[r.criticite] || "dark"} size="xs">{r.criticite}</Badge>;
          }},
          { key: "resultat", label: "Résultat", render: r => (
            <span style={{ fontSize: 11, color: r.resultat === "OK" || r.resultat === "Approuvé" ? C.success : r.resultat.includes("Alerte") ? C.danger : C.gray }}>
              {r.resultat}
            </span>
          )},
        ]} data={filtered} />
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. KPI GLOBAL — Tableau de bord stratégique
// ═══════════════════════════════════════════════════════════════

const AdminKPIPage = () => {
  const [activeSection, setActiveSection] = useState("commercial");

  const sections = [
    { key: "commercial", label: "Performance commerciale", icon: TrendingUp },
    { key: "projets", label: "Performance projets", icon: Building2 },
    { key: "exploitation", label: "Performance exploitation", icon: Activity },
    { key: "adoption", label: "Adoption plateforme", icon: Users },
    { key: "partenaires", label: "Performance partenaires", icon: Briefcase },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>KPI Global — Pilotage stratégique</h2>
        <p style={{ fontSize: 12, color: C.gray, margin: "3px 0 0" }}>Indicateurs de performance consolidés de la plateforme</p>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 8 }}>
        {sections.map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8,
            background: activeSection === s.key ? C.primary : "#fff",
            color: activeSection === s.key ? "#fff" : C.gray,
            border: `1px solid ${activeSection === s.key ? C.primary : C.border}`,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>
            <s.icon size={14} />{s.label}
          </button>
        ))}
      </div>

      {/* Commercial */}
      {activeSection === "commercial" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            <KPICard icon={Target} label="Taux conversion" value="14%" sub="1/7 ce mois" color={C.warning} trend={-5} />
            <KPICard icon={Clock} label="Cycle moyen" value="18j" sub="Formulaire → Conversion" color={C.info} />
            <KPICard icon={DollarSign} label="Pipeline actif" value="578M" sub="FCFA" color={C.success} trend={12} />
            <KPICard icon={Users} label="Leads par source" value="3" sub="Site web en tête" color={C.primary} />
            <KPICard icon={Percent} label="Transf. par type" value="100%" sub="Construction neuve" color={C.success} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card title="Conversion par typologie projet">
              {[
                { type: "Construction neuve", leads: 3, convertis: 1, taux: "33%" },
                { type: "Rénovation", leads: 2, convertis: 0, taux: "0%" },
                { type: "Reprise chantier", leads: 1, convertis: 0, taux: "0%" },
                { type: "Ameublement", leads: 1, convertis: 0, taux: "0%" },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                  <span style={{ fontSize: 12, color: C.dark, flex: 1 }}>{t.type}</span>
                  <span style={{ fontSize: 11, color: C.gray }}>{t.leads} leads</span>
                  <span style={{ fontSize: 11, color: C.gray }}>{t.convertis} conv.</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: parseInt(t.taux) > 0 ? C.success : C.lightGray }}>{t.taux}</span>
                </div>
              ))}
            </Card>
            <Card title="Évolution mensuelle pipeline">
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
                {[
                  { mois: "Jan", value: 120, leads: 2 },
                  { mois: "Fév", value: 185, leads: 3 },
                  { mois: "Mar", value: 310, leads: 5 },
                  { mois: "Avr", value: 578, leads: 7 },
                ].map((m, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: `${(m.value / 578) * 100}%`, background: `linear-gradient(180deg, ${C.primary} 0%, ${C.secondary} 100%)`, borderRadius: "4px 4px 0 0", minHeight: 10, transition: "height 0.5s" }} />
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.dark, marginTop: 4 }}>{m.value}M</div>
                    <div style={{ fontSize: 10, color: C.gray }}>{m.mois}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Projets */}
      {activeSection === "projets" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            <KPICard icon={BarChart3} label="Avancement moyen" value="17%" color={C.primary} />
            <KPICard icon={AlertTriangle} label="Projets en retard" value="0" color={C.success} />
            <KPICard icon={DollarSign} label="Écart budget" value="+2%" sub="Dans les limites" color={C.success} />
            <KPICard icon={Layers} label="Lots actifs" value="3" sub="Sur 9 au total" color={C.info} />
            <KPICard icon={Clock} label="Valid. en attente" value="4" color={C.warning} />
          </div>
          <Card title="Avancement par projet">
            {ADMIN_PROJECTS.map((p, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{p.nom}</span>
                  <StatusBadge statut={p.phase} />
                </div>
                <ScoreBar value={p.avancement} showLabel height={8} />
                <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: C.gray }}>Budget: {(p.budget / 1000000).toFixed(0)}M</span>
                  <span style={{ fontSize: 10, color: C.gray }}>Dépensé: {(p.depense / 1000000).toFixed(1)}M</span>
                  <span style={{ fontSize: 10, color: p.sante === "Bon" ? C.success : C.warning }}>Santé: {p.sante}</span>
                </div>
              </div>
            ))}
          </Card>
        </>
      )}

      {/* Exploitation */}
      {activeSection === "exploitation" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            <KPICard icon={FileCheck} label="Rapports < 24h" value="94%" color={C.success} trend={3} />
            <KPICard icon={CheckCircle2} label="Valid. dans délai" value="89%" color={C.success} />
            <KPICard icon={FolderOpen} label="Complétude docs" value="82%" color={C.primary} />
            <KPICard icon={Package} label="Incidents stock" value="2" color={C.warning} />
            <KPICard icon={CloudSun} label="Alertes météo (mois)" value="3" color={C.info} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card title="Conformité opérationnelle">
              {[
                { label: "Rapports journaliers soumis < 24h", value: 94, target: 100 },
                { label: "Validations AMOA < 48h", value: 89, target: 95 },
                { label: "Demandes d'achat traitées < 72h", value: 75, target: 90 },
                { label: "Documents versés dans la GED", value: 82, target: 100 },
                { label: "Factures envoyées dans les délais", value: 100, target: 100 },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                  <span style={{ fontSize: 12, color: C.dark, flex: 1 }}>{item.label}</span>
                  <ScoreBar value={item.value} showLabel />
                  <span style={{ fontSize: 10, color: C.lightGray, minWidth: 40 }}>Obj: {item.target}%</span>
                </div>
              ))}
            </Card>
            <Card title="Incidents récents">
              <AlertRow icon={Package} text="Stock critique câble 2.5mm² — risque arrêt Lot VII" sub="PRJ-001 · Détecté le 18/04" severity="warning" />
              <AlertRow icon={Camera} text="Flux RTSP CAM-004 interrompu" sub="PRJ-001 · Depuis le 16/04 à 10:00" severity="critical" />
              <AlertRow icon={CloudSun} text="Arrêt partiel chantier le 13/04 — pluie forte" sub="PRJ-001 · Reprise à 14h · 8 ouvriers présents" severity="info" />
            </Card>
          </div>
        </>
      )}

      {/* Adoption */}
      {activeSection === "adoption" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            <KPICard icon={Users} label="Connexions (7j)" value="42" color={C.primary} trend={8} />
            <KPICard icon={Gauge} label="Score adoption moyen" value="59%" color={C.warning} />
            <KPICard icon={GraduationCap} label="Onboarding terminé" value="4/10" sub="40%" color={C.info} />
            <KPICard icon={UserX} label="À renforcer" value="4" color={C.danger} accent={C.danger} />
            <KPICard icon={Award} label="Référents" value="1" sub="S. Kamga (AMOA)" color={C.success} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card title="Adoption par rôle">
              {[
                { role: "SPOC", count: 2, scoreMoyen: 86, icon: Users },
                { role: "AMOA", count: 2, scoreMoyen: 76, icon: Briefcase },
                { role: "MOE", count: 1, scoreMoyen: 45, icon: Ruler },
                { role: "MOEX", count: 1, scoreMoyen: 82, icon: HardHat },
                { role: "Client", count: 3, scoreMoyen: 43, icon: Home },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                  <RoleBadge role={r.role} />
                  <span style={{ fontSize: 12, color: C.gray, flex: 1 }}>{r.count} utilisateur{r.count > 1 ? "s" : ""}</span>
                  <ScoreBar value={r.scoreMoyen} showLabel />
                </div>
              ))}
            </Card>
            <Card title="Usage par module (7j)">
              {[
                { module: "CRM / Prospects", actions: 18, users: 3 },
                { module: "Rapports chantier", actions: 15, users: 3 },
                { module: "Tâches", actions: 12, users: 3 },
                { module: "GED", actions: 8, users: 4 },
                { module: "Devis & Planning", actions: 6, users: 2 },
                { module: "Stock", actions: 5, users: 2 },
                { module: "Achats", actions: 4, users: 2 },
                { module: "Messagerie", actions: 3, users: 5 },
                { module: "Facturation", actions: 2, users: 1 },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                  <span style={{ fontSize: 12, color: C.dark, flex: 1 }}>{m.module}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.primary }}>{m.actions} actions</span>
                  <span style={{ fontSize: 10, color: C.lightGray }}>{m.users} users</span>
                </div>
              ))}
            </Card>
          </div>
        </>
      )}

      {/* Partenaires */}
      {activeSection === "partenaires" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            <KPICard icon={Briefcase} label="Partenaires actifs" value="3" sub="1 AMOA + 1 MOE + 1 MOEX" color={C.primary} />
            <KPICard icon={Clock} label="Respect délais" value="88%" color={C.success} />
            <KPICard icon={Star} label="Qualité livrables" value="4.2/5" color={C.warning} />
            <KPICard icon={AlertTriangle} label="Incidents partenaires" value="3" color={C.danger} />
          </div>
          <Card title="Évaluation partenaires">
            <MiniTable columns={[
              { key: "nom", label: "Partenaire", render: r => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={r.nom} role={r.role} size={28} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 12, color: C.dark }}>{r.nom}</div>
                    <div style={{ fontSize: 10, color: C.gray }}>{r.entite}</div>
                  </div>
                </div>
              )},
              { key: "role", label: "Rôle", render: r => <RoleBadge role={r.role} /> },
              { key: "projets", label: "Projets", render: r => <span style={{ fontWeight: 600 }}>{r.projets}</span> },
              { key: "respectDelais", label: "Respect délais", render: r => <ScoreBar value={r.respectDelais} showLabel /> },
              { key: "qualite", label: "Qualité", render: r => (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={12} color={C.warning} fill={C.warning} />
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{r.qualite}</span>
                </div>
              )},
              { key: "incidents", label: "Incidents", render: r => r.incidents > 0 ? <Badge variant="danger" size="xs">{r.incidents}</Badge> : <span style={{ color: C.lightGray }}>0</span> },
            ]} data={[
              { nom: "S. Kamga", entite: "WeCare SCI", role: "AMOA", projets: 2, respectDelais: 95, qualite: "4.8", incidents: 0 },
              { nom: "Arc. Njoya", entite: "Archi Studio", role: "MOE", projets: 1, respectDelais: 72, qualite: "3.5", incidents: 0 },
              { nom: "B. Ekambi", entite: "BTP Cameroun SARL", role: "MOEX", projets: 1, respectDelais: 85, qualite: "4.2", incidents: 2 },
            ]} />
          </Card>
        </>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SIDEBAR & TOPBAR
// ═══════════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { key: "dashboard", label: "Vue Globale", icon: LayoutDashboard },
  { key: "users", label: "Utilisateurs", icon: Users },
  { key: "prospects", label: "Prospects / CRM", icon: Target },
  { key: "projets", label: "Projets", icon: Building2 },
  { key: "parametrage", label: "Paramétrage", icon: Settings },
  { key: "audit", label: "Audit & Logs", icon: Shield },
  { key: "kpi", label: "KPI Global", icon: BarChart3 },
];

const Sidebar = ({ activeNav, onNav, collapsed }) => (
  <div style={{
    width: collapsed ? 64 : 240, minHeight: "100vh",
    background: C.dark, color: "#fff",
    display: "flex", flexDirection: "column",
    transition: "width 0.2s ease", overflow: "hidden", flexShrink: 0,
  }}>
    {/* Logo */}
    <div style={{ padding: collapsed ? "20px 12px" : "20px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.secondary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff", flexShrink: 0 }}>K</div>
      {!collapsed && <div>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.5 }}>KOMA Expertise</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 0.8, textTransform: "uppercase" }}>Administration</div>
      </div>}
    </div>

    {/* Nav */}
    <div style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
      {NAV_ITEMS.map(item => {
        const active = activeNav === item.key;
        return (
          <button key={item.key} onClick={() => onNav(item.key)} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: collapsed ? "10px 12px" : "9px 12px",
            borderRadius: 8, border: "none", cursor: "pointer",
            background: active ? "rgba(24,183,210,0.15)" : "transparent",
            color: active ? C.primary : "rgba(255,255,255,0.55)",
            fontSize: 13, fontWeight: active ? 600 : 400,
            transition: "all 0.15s", textAlign: "left", width: "100%",
          }}>
            <item.icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>

    {/* User */}
    {!collapsed && (
      <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.primary }}>A</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Admin KOMA</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Super Administrateur</div>
        </div>
        <LogOut size={14} color="rgba(255,255,255,0.3)" style={{ cursor: "pointer" }} />
      </div>
    )}
  </div>
);

const TopBar = ({ onToggleSidebar }) => (
  <div style={{
    height: 56, padding: "0 24px", display: "flex", alignItems: "center",
    justifyContent: "space-between", borderBottom: `1px solid ${C.border}`,
    background: "#fff", flexShrink: 0,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button onClick={onToggleSidebar} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: C.gray, display: "flex" }}>
        <Menu size={20} />
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.bg, borderRadius: 8, padding: "6px 14px", border: `1px solid ${C.border}`, width: 320 }}>
        <Search size={14} color={C.lightGray} />
        <input placeholder="Rechercher utilisateur, projet, prospect…" style={{ border: "none", background: "transparent", outline: "none", fontSize: 12, color: C.darkGray, width: "100%" }} />
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Badge variant="active" size="lg">Portail Admin</Badge>
      <div style={{ position: "relative", cursor: "pointer" }}>
        <Bell size={18} color={C.gray} />
        <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: C.danger, border: "2px solid #fff" }} />
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function KomaAdminPortal() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (activeNav) {
      case "dashboard": return <AdminDashboard onNav={setActiveNav} />;
      case "users": return <AdminUsersPage />;
      case "prospects": return <AdminProspectsPage />;
      case "projets": return <AdminProjectsPage />;
      case "parametrage": return <AdminParametragePage />;
      case "audit": return <AdminAuditPage />;
      case "kpi": return <AdminKPIPage />;
      default: return <AdminDashboard onNav={setActiveNav} />;
    }
  };

  return (
    <div style={{
      display: "flex", height: "100vh", width: "100%",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      background: C.bg, overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        button:hover { opacity: 0.92; }
      `}</style>

      <Sidebar activeNav={activeNav} onNav={setActiveNav} collapsed={sidebarCollapsed} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar onToggleSidebar={() => setSidebarCollapsed(p => !p)} />
        <div style={{ flex: 1, overflow: "auto", padding: 22 }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
