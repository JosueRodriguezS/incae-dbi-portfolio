import { useState, useMemo, useEffect, useRef } from "react";
import { TrendingUp, Star, Users, Clock, ShoppingCart, RefreshCw, AlertTriangle, Play, Pause } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  ResponsiveContainer, ReferenceLine, AreaChart, Area, CartesianGrid,
  LineChart, Line,
} from "recharts";

// ── DATA ──────────────────────────────────────────────────────────────────────
const RAW = [{"p":"Thomas","drs":4.6,"mon":12,"sess":7,"sat":6.1,"nps":-2.1,"fbr":3,"asp":25.5,"coc":0,"risk":"Low","fla":4,"rv":17,"cr":1,"ts":3.7,"fbs":0,"ws":0,"srd":4.6,"bpi":6.1},{"p":"Peter","drs":5.1,"mon":15,"sess":10,"sat":8.4,"nps":8.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":16,"cr":4,"ts":6.8,"fbs":0,"ws":0,"srd":0.0,"bpi":6.2},{"p":"Stefan","drs":4.0,"mon":1,"sess":4,"sat":6.0,"nps":3.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":13,"cr":3,"ts":5.2,"fbs":1,"ws":1,"srd":0.0,"bpi":3.7},{"p":"Stefan","drs":1.5,"mon":9,"sess":7,"sat":7.2,"nps":5.8,"fbr":3,"asp":33.8,"coc":0,"risk":"Low","fla":5,"rv":10,"cr":1,"ts":4.3,"fbs":1,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Thomas","drs":4.2,"mon":13,"sess":5,"sat":6.6,"nps":-0.1,"fbr":3,"asp":19.3,"coc":0,"risk":"Low","fla":4,"rv":9,"cr":0,"ts":4.0,"fbs":0,"ws":0,"srd":2.6,"bpi":4.4},{"p":"Thomas","drs":3.7,"mon":5,"sess":3,"sat":6.7,"nps":3.6,"fbr":3,"asp":15.9,"coc":0,"risk":"Low","fla":5,"rv":13,"cr":4,"ts":4.5,"fbs":1,"ws":0,"srd":2.1,"bpi":6.7},{"p":"Daniel","drs":7.8,"mon":6,"sess":20,"sat":7.8,"nps":7.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":11,"cr":1,"ts":4.0,"fbs":0,"ws":0,"srd":0.0,"bpi":4.9},{"p":"Peter","drs":6.5,"mon":11,"sess":7,"sat":8.6,"nps":9.6,"fbr":3,"asp":5.5,"coc":0,"risk":"Low","fla":4,"rv":14,"cr":3,"ts":3.7,"fbs":1,"ws":0,"srd":0.0,"bpi":7.7},{"p":"Stefan","drs":3.4,"mon":17,"sess":4,"sat":6.0,"nps":3.6,"fbr":3,"asp":39.2,"coc":0,"risk":"Low","fla":5,"rv":13,"cr":1,"ts":2.7,"fbs":1,"ws":0,"srd":0.0,"bpi":5.4},{"p":"Stefan","drs":2.8,"mon":15,"sess":6,"sat":6.6,"nps":5.6,"fbr":3,"asp":42.9,"coc":0,"risk":"Low","fla":5,"rv":17,"cr":2,"ts":4.7,"fbs":2,"ws":0,"srd":0.0,"bpi":5.1},{"p":"Daniel","drs":5.5,"mon":11,"sess":4,"sat":4.9,"nps":2.5,"fbr":3,"asp":56.2,"coc":0,"risk":"Low","fla":5,"rv":17,"cr":4,"ts":7.2,"fbs":0,"ws":0,"srd":0.0,"bpi":6.7},{"p":"Peter","drs":3.8,"mon":13,"sess":2,"sat":5.9,"nps":2.1,"fbr":3,"asp":31.6,"coc":0,"risk":"Med","fla":7,"rv":9,"cr":1,"ts":3.1,"fbs":2,"ws":1,"srd":1.5,"bpi":4.9},{"p":"Peter","drs":4.9,"mon":7,"sess":8,"sat":6.8,"nps":4.8,"fbr":3,"asp":26.6,"coc":0,"risk":"Low","fla":3,"rv":15,"cr":4,"ts":3.2,"fbs":0,"ws":0,"srd":0.0,"bpi":6.5},{"p":"Thomas","drs":3.6,"mon":12,"sess":6,"sat":6.1,"nps":4.7,"fbr":3,"asp":23.2,"coc":0,"risk":"Med","fla":2,"rv":10,"cr":2,"ts":2.0,"fbs":0,"ws":0,"srd":0.0,"bpi":5.0},{"p":"Thomas","drs":2.1,"mon":9,"sess":4,"sat":5.2,"nps":1.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":16,"cr":3,"ts":5.5,"fbs":1,"ws":0,"srd":6.5,"bpi":5.0},{"p":"Thomas","drs":6.4,"mon":3,"sess":8,"sat":5.5,"nps":4.0,"fbr":3,"asp":16.8,"coc":0,"risk":"Low","fla":4,"rv":23,"cr":4,"ts":5.5,"fbs":0,"ws":0,"srd":1.2,"bpi":7.0},{"p":"Thomas","drs":5.3,"mon":13,"sess":17,"sat":6.7,"nps":5.6,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":21,"cr":5,"ts":2.6,"fbs":0,"ws":0,"srd":0.0,"bpi":4.9},{"p":"Stefan","drs":3.2,"mon":10,"sess":5,"sat":7.9,"nps":4.2,"fbr":3,"asp":17.8,"coc":0,"risk":"Med","fla":3,"rv":18,"cr":1,"ts":0.8,"fbs":2,"ws":0,"srd":2.0,"bpi":4.3},{"p":"Thomas","drs":3.6,"mon":7,"sess":2,"sat":5.4,"nps":-2.5,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":5,"rv":16,"cr":2,"ts":5.3,"fbs":0,"ws":0,"srd":0.0,"bpi":6.2},{"p":"Thomas","drs":3.2,"mon":17,"sess":5,"sat":7.3,"nps":4.6,"fbr":3,"asp":31.8,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":3,"ts":2.6,"fbs":1,"ws":0,"srd":0.0,"bpi":5.8},{"p":"Stefan","drs":1.4,"mon":1,"sess":5,"sat":6.5,"nps":0.0,"fbr":3,"asp":41.1,"coc":0,"risk":"Low","fla":5,"rv":11,"cr":0,"ts":5.2,"fbs":0,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Thomas","drs":3.6,"mon":6,"sess":7,"sat":8.3,"nps":6.8,"fbr":3,"asp":55.2,"coc":0,"risk":"Low","fla":5,"rv":15,"cr":1,"ts":3.8,"fbs":3,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Thomas","drs":3.8,"mon":1,"sess":5,"sat":7.2,"nps":4.4,"fbr":3,"asp":14.0,"coc":0,"risk":"Low","fla":3,"rv":19,"cr":2,"ts":4.9,"fbs":1,"ws":0,"srd":2.1,"bpi":6.0},{"p":"Thomas","drs":2.0,"mon":14,"sess":6,"sat":7.3,"nps":7.9,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":10,"rv":16,"cr":0,"ts":6.0,"fbs":0,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Stefan","drs":2.9,"mon":13,"sess":3,"sat":6.4,"nps":4.1,"fbr":3,"asp":12.6,"coc":0,"risk":"Med","fla":5,"rv":19,"cr":2,"ts":3.7,"fbs":1,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Peter","drs":4.8,"mon":6,"sess":9,"sat":6.6,"nps":5.6,"fbr":3,"asp":6.9,"coc":0,"risk":"Low","fla":4,"rv":16,"cr":4,"ts":2.6,"fbs":1,"ws":1,"srd":1.5,"bpi":3.8},{"p":"Thomas","drs":1.2,"mon":12,"sess":5,"sat":6.5,"nps":1.8,"fbr":3,"asp":65.6,"coc":0,"risk":"Med","fla":4,"rv":10,"cr":3,"ts":4.7,"fbs":1,"ws":0,"srd":3.1,"bpi":3.3},{"p":"Stefan","drs":1.5,"mon":7,"sess":3,"sat":6.8,"nps":7.4,"fbr":3,"asp":29.0,"coc":0,"risk":"Med","fla":7,"rv":12,"cr":2,"ts":3.8,"fbs":3,"ws":0,"srd":0.0,"bpi":7.8},{"p":"Stefan","drs":2.0,"mon":14,"sess":5,"sat":6.2,"nps":4.6,"fbr":3,"asp":16.4,"coc":0,"risk":"Low","fla":3,"rv":17,"cr":4,"ts":5.6,"fbs":0,"ws":0,"srd":0.0,"bpi":5.6},{"p":"Daniel","drs":9.8,"mon":8,"sess":22,"sat":9.6,"nps":10.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":17,"cr":3,"ts":3.1,"fbs":0,"ws":0,"srd":0.0,"bpi":8.3},{"p":"Stefan","drs":3.2,"mon":8,"sess":5,"sat":9.1,"nps":3.7,"fbr":3,"asp":22.1,"coc":0,"risk":"Med","fla":2,"rv":21,"cr":0,"ts":4.2,"fbs":1,"ws":0,"srd":0.0,"bpi":5.4},{"p":"Thomas","drs":1.9,"mon":17,"sess":5,"sat":6.5,"nps":5.9,"fbr":3,"asp":40.7,"coc":0,"risk":"Low","fla":4,"rv":13,"cr":2,"ts":3.4,"fbs":1,"ws":0,"srd":1.0,"bpi":5.5},{"p":"Daniel","drs":8.1,"mon":5,"sess":14,"sat":7.4,"nps":9.2,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":14,"cr":5,"ts":3.7,"fbs":2,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Peter","drs":3.1,"mon":2,"sess":1,"sat":6.5,"nps":3.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":22,"cr":1,"ts":3.0,"fbs":1,"ws":0,"srd":0.0,"bpi":8.8},{"p":"Peter","drs":6.3,"mon":11,"sess":12,"sat":7.7,"nps":5.5,"fbr":3,"asp":62.0,"coc":0,"risk":"Low","fla":8,"rv":22,"cr":2,"ts":5.4,"fbs":0,"ws":0,"srd":0.0,"bpi":6.8},{"p":"Peter","drs":4.4,"mon":18,"sess":1,"sat":7.2,"nps":3.1,"fbr":3,"asp":21.4,"coc":0,"risk":"Med","fla":5,"rv":16,"cr":2,"ts":0.4,"fbs":1,"ws":0,"srd":0.0,"bpi":5.4},{"p":"Thomas","drs":3.4,"mon":7,"sess":4,"sat":6.8,"nps":-0.5,"fbr":3,"asp":19.5,"coc":0,"risk":"Med","fla":8,"rv":19,"cr":2,"ts":4.0,"fbs":3,"ws":0,"srd":0.0,"bpi":3.9},{"p":"Daniel","drs":9.1,"mon":1,"sess":16,"sat":8.3,"nps":5.2,"fbr":3,"asp":38.3,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":1,"ts":3.5,"fbs":1,"ws":0,"srd":0.0,"bpi":9.4},{"p":"Stefan","drs":1.0,"mon":6,"sess":3,"sat":5.5,"nps":5.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":7,"rv":13,"cr":2,"ts":4.3,"fbs":0,"ws":0,"srd":0.0,"bpi":5.2},{"p":"Thomas","drs":1.8,"mon":9,"sess":2,"sat":6.8,"nps":6.3,"fbr":3,"asp":64.8,"coc":0,"risk":"Med","fla":8,"rv":20,"cr":0,"ts":7.2,"fbs":0,"ws":0,"srd":0.0,"bpi":6.5},{"p":"Thomas","drs":2.8,"mon":3,"sess":1,"sat":5.6,"nps":-0.7,"fbr":3,"asp":66.1,"coc":0,"risk":"Med","fla":3,"rv":20,"cr":0,"ts":3.2,"fbs":0,"ws":0,"srd":0.0,"bpi":6.8},{"p":"Stefan","drs":3.7,"mon":12,"sess":5,"sat":5.3,"nps":-0.8,"fbr":3,"asp":36.4,"coc":0,"risk":"Med","fla":4,"rv":15,"cr":0,"ts":6.2,"fbs":0,"ws":1,"srd":0.0,"bpi":5.4},{"p":"Daniel","drs":5.7,"mon":18,"sess":13,"sat":7.4,"nps":10.0,"fbr":3,"asp":27.4,"coc":0,"risk":"Low","fla":6,"rv":17,"cr":2,"ts":3.4,"fbs":1,"ws":0,"srd":0.0,"bpi":7.1},{"p":"Peter","drs":1.6,"mon":8,"sess":5,"sat":7.6,"nps":2.6,"fbr":2,"asp":0.0,"coc":0,"risk":"High","fla":4,"rv":18,"cr":5,"ts":2.2,"fbs":0,"ws":0,"srd":0.0,"bpi":4.8},{"p":"Thomas","drs":3.0,"mon":6,"sess":1,"sat":6.1,"nps":0.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":8,"cr":3,"ts":0.6,"fbs":1,"ws":0,"srd":2.1,"bpi":4.6},{"p":"Stefan","drs":3.2,"mon":7,"sess":5,"sat":5.4,"nps":-0.3,"fbr":3,"asp":66.7,"coc":1,"risk":"Med","fla":6,"rv":16,"cr":4,"ts":5.7,"fbs":0,"ws":0,"srd":0.0,"bpi":7.2},{"p":"Thomas","drs":4.9,"mon":2,"sess":8,"sat":8.0,"nps":2.6,"fbr":3,"asp":11.0,"coc":0,"risk":"Low","fla":2,"rv":8,"cr":1,"ts":3.2,"fbs":1,"ws":0,"srd":9.1,"bpi":6.0},{"p":"Stefan","drs":1.9,"mon":16,"sess":1,"sat":5.8,"nps":0.3,"fbr":3,"asp":14.9,"coc":0,"risk":"Med","fla":4,"rv":16,"cr":2,"ts":4.8,"fbs":0,"ws":0,"srd":0.0,"bpi":6.2},{"p":"Stefan","drs":2.0,"mon":8,"sess":3,"sat":6.7,"nps":2.1,"fbr":3,"asp":10.2,"coc":0,"risk":"Med","fla":2,"rv":18,"cr":3,"ts":3.7,"fbs":0,"ws":1,"srd":0.0,"bpi":6.1},{"p":"Thomas","drs":4.9,"mon":7,"sess":9,"sat":6.0,"nps":-0.3,"fbr":3,"asp":36.5,"coc":0,"risk":"Low","fla":8,"rv":13,"cr":2,"ts":4.9,"fbs":1,"ws":0,"srd":2.1,"bpi":6.9},{"p":"Peter","drs":2.8,"mon":12,"sess":3,"sat":6.1,"nps":5.5,"fbr":3,"asp":24.7,"coc":0,"risk":"Med","fla":7,"rv":17,"cr":3,"ts":5.5,"fbs":1,"ws":0,"srd":2.3,"bpi":3.9},{"p":"Peter","drs":4.5,"mon":8,"sess":17,"sat":8.1,"nps":3.3,"fbr":3,"asp":28.5,"coc":0,"risk":"Low","fla":2,"rv":16,"cr":5,"ts":6.8,"fbs":0,"ws":0,"srd":0.0,"bpi":5.4},{"p":"Peter","drs":5.2,"mon":12,"sess":8,"sat":6.8,"nps":3.2,"fbr":3,"asp":16.9,"coc":0,"risk":"Low","fla":5,"rv":17,"cr":3,"ts":3.5,"fbs":1,"ws":0,"srd":2.9,"bpi":5.9},{"p":"Peter","drs":5.5,"mon":1,"sess":8,"sat":6.8,"nps":1.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":16,"cr":1,"ts":7.4,"fbs":3,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Stefan","drs":1.9,"mon":15,"sess":3,"sat":4.6,"nps":-1.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":7,"rv":11,"cr":2,"ts":5.6,"fbs":1,"ws":0,"srd":0.0,"bpi":6.1},{"p":"Peter","drs":5.0,"mon":17,"sess":7,"sat":7.2,"nps":2.1,"fbr":3,"asp":22.8,"coc":0,"risk":"Low","fla":7,"rv":15,"cr":1,"ts":5.2,"fbs":1,"ws":0,"srd":3.5,"bpi":7.6},{"p":"Daniel","drs":4.5,"mon":12,"sess":10,"sat":6.0,"nps":2.2,"fbr":3,"asp":35.8,"coc":0,"risk":"Low","fla":7,"rv":15,"cr":2,"ts":5.6,"fbs":0,"ws":1,"srd":0.0,"bpi":7.7},{"p":"Thomas","drs":2.7,"mon":18,"sess":5,"sat":7.3,"nps":5.4,"fbr":3,"asp":47.6,"coc":0,"risk":"Low","fla":6,"rv":29,"cr":1,"ts":0.5,"fbs":1,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Daniel","drs":8.0,"mon":3,"sess":18,"sat":7.7,"nps":8.9,"fbr":3,"asp":42.2,"coc":0,"risk":"Low","fla":5,"rv":15,"cr":2,"ts":3.9,"fbs":2,"ws":0,"srd":0.0,"bpi":7.2},{"p":"Thomas","drs":2.3,"mon":9,"sess":6,"sat":6.8,"nps":2.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":5,"rv":14,"cr":1,"ts":2.9,"fbs":1,"ws":0,"srd":0.0,"bpi":6.2},{"p":"Thomas","drs":3.6,"mon":11,"sess":3,"sat":6.7,"nps":7.4,"fbr":3,"asp":61.7,"coc":0,"risk":"Low","fla":8,"rv":13,"cr":3,"ts":8.3,"fbs":1,"ws":0,"srd":6.0,"bpi":6.7},{"p":"Thomas","drs":4.0,"mon":11,"sess":3,"sat":7.0,"nps":2.0,"fbr":3,"asp":66.2,"coc":0,"risk":"Low","fla":7,"rv":16,"cr":3,"ts":4.3,"fbs":1,"ws":0,"srd":0.0,"bpi":4.9},{"p":"Peter","drs":4.6,"mon":7,"sess":11,"sat":8.1,"nps":5.6,"fbr":3,"asp":38.4,"coc":0,"risk":"Low","fla":4,"rv":16,"cr":3,"ts":4.2,"fbs":3,"ws":1,"srd":1.6,"bpi":8.3},{"p":"Thomas","drs":3.7,"mon":6,"sess":2,"sat":7.3,"nps":9.0,"fbr":3,"asp":25.2,"coc":0,"risk":"Low","fla":5,"rv":13,"cr":0,"ts":4.0,"fbs":0,"ws":0,"srd":7.2,"bpi":7.1},{"p":"Thomas","drs":2.3,"mon":2,"sess":1,"sat":5.2,"nps":7.7,"fbr":3,"asp":51.6,"coc":0,"risk":"Med","fla":8,"rv":7,"cr":0,"ts":2.7,"fbs":0,"ws":0,"srd":5.3,"bpi":6.8},{"p":"Stefan","drs":2.3,"mon":7,"sess":4,"sat":5.7,"nps":5.6,"fbr":3,"asp":10.2,"coc":1,"risk":"Med","fla":5,"rv":8,"cr":1,"ts":3.0,"fbs":3,"ws":0,"srd":0.0,"bpi":7.1},{"p":"Thomas","drs":4.2,"mon":3,"sess":3,"sat":7.0,"nps":3.4,"fbr":3,"asp":57.8,"coc":0,"risk":"Low","fla":2,"rv":19,"cr":1,"ts":5.0,"fbs":1,"ws":0,"srd":4.8,"bpi":6.7},{"p":"Peter","drs":5.2,"mon":14,"sess":13,"sat":6.7,"nps":4.7,"fbr":3,"asp":35.6,"coc":0,"risk":"Low","fla":3,"rv":17,"cr":4,"ts":0.6,"fbs":0,"ws":1,"srd":1.3,"bpi":5.0},{"p":"Daniel","drs":6.8,"mon":4,"sess":13,"sat":6.0,"nps":3.7,"fbr":3,"asp":61.2,"coc":0,"risk":"Low","fla":7,"rv":20,"cr":1,"ts":5.5,"fbs":0,"ws":0,"srd":1.1,"bpi":6.4},{"p":"Peter","drs":5.3,"mon":1,"sess":11,"sat":6.1,"nps":3.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":3,"rv":13,"cr":2,"ts":2.0,"fbs":1,"ws":0,"srd":0.0,"bpi":4.3},{"p":"Peter","drs":5.9,"mon":10,"sess":11,"sat":7.3,"nps":2.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":8,"rv":14,"cr":1,"ts":6.6,"fbs":2,"ws":1,"srd":0.0,"bpi":6.9},{"p":"Thomas","drs":1.0,"mon":11,"sess":2,"sat":3.0,"nps":-3.4,"fbr":3,"asp":58.3,"coc":0,"risk":"High","fla":1,"rv":14,"cr":2,"ts":3.8,"fbs":0,"ws":0,"srd":0.0,"bpi":5.2},{"p":"Daniel","drs":8.9,"mon":16,"sess":20,"sat":6.9,"nps":2.5,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":17,"cr":0,"ts":1.8,"fbs":0,"ws":1,"srd":0.0,"bpi":6.9},{"p":"Peter","drs":4.6,"mon":11,"sess":6,"sat":5.6,"nps":-1.2,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":3,"rv":19,"cr":4,"ts":3.1,"fbs":0,"ws":0,"srd":0.0,"bpi":7.6},{"p":"Stefan","drs":3.0,"mon":6,"sess":3,"sat":7.5,"nps":4.2,"fbr":3,"asp":12.9,"coc":0,"risk":"Low","fla":5,"rv":18,"cr":2,"ts":5.1,"fbs":1,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Stefan","drs":3.9,"mon":15,"sess":5,"sat":7.0,"nps":4.8,"fbr":3,"asp":22.6,"coc":0,"risk":"Low","fla":5,"rv":11,"cr":0,"ts":3.5,"fbs":2,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Peter","drs":3.4,"mon":10,"sess":4,"sat":6.3,"nps":5.1,"fbr":3,"asp":77.4,"coc":0,"risk":"Low","fla":2,"rv":12,"cr":2,"ts":4.2,"fbs":2,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Daniel","drs":6.6,"mon":2,"sess":8,"sat":6.9,"nps":3.2,"fbr":3,"asp":28.6,"coc":0,"risk":"Low","fla":7,"rv":15,"cr":3,"ts":4.6,"fbs":0,"ws":0,"srd":3.7,"bpi":4.3},{"p":"Thomas","drs":3.2,"mon":10,"sess":1,"sat":6.9,"nps":3.6,"fbr":3,"asp":10.0,"coc":0,"risk":"Med","fla":2,"rv":15,"cr":2,"ts":4.7,"fbs":0,"ws":0,"srd":7.0,"bpi":5.5},{"p":"Thomas","drs":2.6,"mon":17,"sess":1,"sat":5.1,"nps":2.2,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":13,"cr":2,"ts":4.3,"fbs":0,"ws":0,"srd":3.6,"bpi":3.0},{"p":"Peter","drs":7.1,"mon":7,"sess":19,"sat":8.4,"nps":7.0,"fbr":3,"asp":14.5,"coc":1,"risk":"Low","fla":5,"rv":12,"cr":2,"ts":3.9,"fbs":0,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Stefan","drs":1.5,"mon":5,"sess":2,"sat":5.8,"nps":2.6,"fbr":3,"asp":30.4,"coc":0,"risk":"Med","fla":4,"rv":14,"cr":0,"ts":3.9,"fbs":3,"ws":1,"srd":0.0,"bpi":6.5},{"p":"Thomas","drs":2.8,"mon":3,"sess":3,"sat":6.8,"nps":3.8,"fbr":3,"asp":34.1,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":0,"ts":2.7,"fbs":0,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Daniel","drs":7.7,"mon":3,"sess":18,"sat":8.2,"nps":6.9,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":15,"cr":1,"ts":6.2,"fbs":1,"ws":0,"srd":1.7,"bpi":6.0},{"p":"Thomas","drs":2.1,"mon":8,"sess":4,"sat":6.5,"nps":0.3,"fbr":3,"asp":11.1,"coc":0,"risk":"Low","fla":4,"rv":18,"cr":3,"ts":8.5,"fbs":0,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Thomas","drs":3.0,"mon":11,"sess":6,"sat":6.5,"nps":3.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":4,"ts":3.3,"fbs":1,"ws":0,"srd":1.3,"bpi":4.5},{"p":"Stefan","drs":2.9,"mon":2,"sess":7,"sat":6.5,"nps":6.6,"fbr":3,"asp":22.7,"coc":0,"risk":"Low","fla":5,"rv":18,"cr":2,"ts":4.4,"fbs":1,"ws":0,"srd":0.0,"bpi":5.8},{"p":"Stefan","drs":2.1,"mon":17,"sess":2,"sat":5.7,"nps":1.8,"fbr":3,"asp":19.8,"coc":0,"risk":"Med","fla":7,"rv":11,"cr":2,"ts":6.0,"fbs":2,"ws":0,"srd":0.0,"bpi":9.1},{"p":"Peter","drs":4.9,"mon":14,"sess":10,"sat":7.1,"nps":2.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":15,"cr":2,"ts":5.8,"fbs":3,"ws":0,"srd":4.6,"bpi":8.4},{"p":"Stefan","drs":1.9,"mon":11,"sess":7,"sat":6.3,"nps":6.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":6,"rv":18,"cr":0,"ts":4.7,"fbs":1,"ws":0,"srd":0.0,"bpi":5.6},{"p":"Thomas","drs":1.7,"mon":15,"sess":7,"sat":5.6,"nps":3.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":8,"rv":10,"cr":0,"ts":3.0,"fbs":2,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Stefan","drs":2.9,"mon":2,"sess":7,"sat":6.7,"nps":5.3,"fbr":3,"asp":31.0,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":0,"ts":7.1,"fbs":1,"ws":0,"srd":0.0,"bpi":4.6},{"p":"Peter","drs":7.1,"mon":9,"sess":17,"sat":7.4,"nps":6.7,"fbr":3,"asp":13.5,"coc":0,"risk":"Low","fla":2,"rv":8,"cr":0,"ts":4.1,"fbs":0,"ws":0,"srd":4.8,"bpi":5.7},{"p":"Stefan","drs":2.5,"mon":12,"sess":4,"sat":7.0,"nps":1.2,"fbr":3,"asp":22.1,"coc":0,"risk":"Low","fla":4,"rv":17,"cr":1,"ts":4.3,"fbs":1,"ws":0,"srd":0.0,"bpi":6.1},{"p":"Peter","drs":5.3,"mon":15,"sess":12,"sat":5.5,"nps":2.6,"fbr":3,"asp":43.7,"coc":0,"risk":"Low","fla":6,"rv":20,"cr":2,"ts":3.7,"fbs":0,"ws":0,"srd":1.6,"bpi":5.6},{"p":"Stefan","drs":3.3,"mon":14,"sess":4,"sat":6.1,"nps":5.7,"fbr":3,"asp":37.9,"coc":0,"risk":"Med","fla":3,"rv":9,"cr":3,"ts":3.9,"fbs":2,"ws":0,"srd":0.0,"bpi":6.9},{"p":"Stefan","drs":1.0,"mon":5,"sess":8,"sat":5.4,"nps":-0.4,"fbr":3,"asp":54.2,"coc":1,"risk":"High","fla":3,"rv":13,"cr":6,"ts":1.0,"fbs":0,"ws":0,"srd":0.0,"bpi":7.3},{"p":"Thomas","drs":5.5,"mon":17,"sess":9,"sat":6.9,"nps":-1.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":19,"cr":3,"ts":5.3,"fbs":0,"ws":0,"srd":0.0,"bpi":6.7},{"p":"Daniel","drs":7.7,"mon":2,"sess":14,"sat":7.8,"nps":6.5,"fbr":3,"asp":13.7,"coc":0,"risk":"Low","fla":5,"rv":18,"cr":2,"ts":5.8,"fbs":3,"ws":0,"srd":1.1,"bpi":6.9},{"p":"Thomas","drs":5.5,"mon":16,"sess":7,"sat":5.9,"nps":1.9,"fbr":3,"asp":20.1,"coc":0,"risk":"Low","fla":6,"rv":12,"cr":2,"ts":4.6,"fbs":2,"ws":0,"srd":2.6,"bpi":4.3},{"p":"Daniel","drs":6.6,"mon":18,"sess":14,"sat":7.3,"nps":0.7,"fbr":3,"asp":40.5,"coc":0,"risk":"Low","fla":2,"rv":19,"cr":0,"ts":2.6,"fbs":1,"ws":0,"srd":0.0,"bpi":7.4},{"p":"Stefan","drs":4.7,"mon":3,"sess":6,"sat":6.5,"nps":4.5,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":15,"cr":1,"ts":4.9,"fbs":1,"ws":0,"srd":3.6,"bpi":4.8},{"p":"Thomas","drs":4.4,"mon":13,"sess":7,"sat":6.1,"nps":3.5,"fbr":3,"asp":37.2,"coc":0,"risk":"Low","fla":4,"rv":14,"cr":2,"ts":5.0,"fbs":3,"ws":0,"srd":0.0,"bpi":5.6},{"p":"Stefan","drs":3.2,"mon":1,"sess":4,"sat":6.3,"nps":-1.1,"fbr":3,"asp":7.0,"coc":1,"risk":"Low","fla":3,"rv":15,"cr":1,"ts":2.5,"fbs":0,"ws":0,"srd":0.0,"bpi":7.0},{"p":"Peter","drs":5.3,"mon":7,"sess":9,"sat":6.1,"nps":6.9,"fbr":3,"asp":23.9,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":1,"ts":5.5,"fbs":1,"ws":1,"srd":4.7,"bpi":7.5},{"p":"Thomas","drs":3.2,"mon":9,"sess":4,"sat":8.0,"nps":7.9,"fbr":3,"asp":9.5,"coc":0,"risk":"Med","fla":2,"rv":21,"cr":0,"ts":4.5,"fbs":0,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Thomas","drs":4.9,"mon":11,"sess":14,"sat":8.0,"nps":1.3,"fbr":3,"asp":43.9,"coc":0,"risk":"Low","fla":6,"rv":25,"cr":0,"ts":5.1,"fbs":1,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Peter","drs":5.2,"mon":17,"sess":9,"sat":7.3,"nps":6.6,"fbr":3,"asp":23.1,"coc":0,"risk":"Low","fla":8,"rv":16,"cr":3,"ts":4.3,"fbs":1,"ws":1,"srd":6.0,"bpi":5.4},{"p":"Thomas","drs":1.1,"mon":12,"sess":4,"sat":5.6,"nps":3.2,"fbr":2,"asp":0.0,"coc":1,"risk":"High","fla":5,"rv":24,"cr":1,"ts":4.2,"fbs":0,"ws":0,"srd":3.8,"bpi":4.0},{"p":"Daniel","drs":6.2,"mon":9,"sess":12,"sat":7.9,"nps":9.3,"fbr":3,"asp":25.5,"coc":0,"risk":"Low","fla":6,"rv":18,"cr":1,"ts":3.1,"fbs":3,"ws":0,"srd":1.4,"bpi":5.7},{"p":"Thomas","drs":3.3,"mon":15,"sess":5,"sat":6.7,"nps":1.8,"fbr":3,"asp":11.4,"coc":0,"risk":"Low","fla":5,"rv":12,"cr":4,"ts":4.5,"fbs":2,"ws":0,"srd":0.0,"bpi":3.9},{"p":"Thomas","drs":3.9,"mon":18,"sess":3,"sat":6.4,"nps":4.9,"fbr":3,"asp":15.8,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":3,"ts":5.0,"fbs":1,"ws":0,"srd":4.4,"bpi":6.8},{"p":"Peter","drs":4.9,"mon":1,"sess":11,"sat":5.9,"nps":1.2,"fbr":3,"asp":27.0,"coc":0,"risk":"Low","fla":6,"rv":13,"cr":2,"ts":6.1,"fbs":1,"ws":0,"srd":13.4,"bpi":6.7},{"p":"Peter","drs":6.5,"mon":18,"sess":6,"sat":6.6,"nps":1.8,"fbr":3,"asp":18.3,"coc":1,"risk":"Low","fla":4,"rv":16,"cr":5,"ts":4.4,"fbs":1,"ws":0,"srd":8.1,"bpi":7.2},{"p":"Stefan","drs":1.0,"mon":2,"sess":8,"sat":6.1,"nps":0.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":15,"cr":2,"ts":4.3,"fbs":1,"ws":1,"srd":0.0,"bpi":4.3},{"p":"Peter","drs":5.2,"mon":15,"sess":11,"sat":7.0,"nps":-0.8,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":14,"cr":1,"ts":3.5,"fbs":3,"ws":0,"srd":7.2,"bpi":4.8},{"p":"Peter","drs":2.8,"mon":5,"sess":3,"sat":6.3,"nps":4.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":5,"rv":14,"cr":4,"ts":2.6,"fbs":2,"ws":0,"srd":0.0,"bpi":5.8},{"p":"Thomas","drs":4.4,"mon":2,"sess":2,"sat":7.3,"nps":3.9,"fbr":3,"asp":41.7,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":4,"ts":3.6,"fbs":0,"ws":0,"srd":0.0,"bpi":6.2},{"p":"Peter","drs":4.9,"mon":8,"sess":9,"sat":7.7,"nps":-1.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":4,"ts":5.9,"fbs":3,"ws":0,"srd":0.0,"bpi":6.0},{"p":"Stefan","drs":3.0,"mon":12,"sess":6,"sat":7.0,"nps":4.2,"fbr":3,"asp":6.3,"coc":1,"risk":"Low","fla":7,"rv":15,"cr":3,"ts":5.6,"fbs":1,"ws":1,"srd":2.1,"bpi":5.5},{"p":"Peter","drs":4.0,"mon":7,"sess":2,"sat":7.1,"nps":7.1,"fbr":3,"asp":35.7,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":1,"ts":5.0,"fbs":1,"ws":0,"srd":0.0,"bpi":8.1},{"p":"Peter","drs":6.5,"mon":1,"sess":10,"sat":5.9,"nps":-1.5,"fbr":3,"asp":19.1,"coc":0,"risk":"Low","fla":4,"rv":14,"cr":3,"ts":1.1,"fbs":0,"ws":0,"srd":5.2,"bpi":7.0},{"p":"Thomas","drs":4.8,"mon":11,"sess":15,"sat":7.9,"nps":4.0,"fbr":3,"asp":26.5,"coc":0,"risk":"Low","fla":3,"rv":17,"cr":0,"ts":4.2,"fbs":0,"ws":0,"srd":0.0,"bpi":8.5},{"p":"Thomas","drs":4.2,"mon":17,"sess":3,"sat":6.8,"nps":4.7,"fbr":3,"asp":55.9,"coc":0,"risk":"Low","fla":9,"rv":11,"cr":0,"ts":3.0,"fbs":0,"ws":0,"srd":0.0,"bpi":7.6},{"p":"Thomas","drs":3.3,"mon":7,"sess":5,"sat":5.9,"nps":-4.6,"fbr":3,"asp":16.7,"coc":0,"risk":"Med","fla":6,"rv":12,"cr":4,"ts":2.4,"fbs":1,"ws":0,"srd":0.0,"bpi":7.9},{"p":"Thomas","drs":4.2,"mon":4,"sess":1,"sat":6.3,"nps":1.3,"fbr":3,"asp":27.8,"coc":0,"risk":"Low","fla":6,"rv":20,"cr":5,"ts":2.9,"fbs":1,"ws":0,"srd":0.0,"bpi":4.8},{"p":"Peter","drs":4.2,"mon":8,"sess":4,"sat":6.2,"nps":3.3,"fbr":3,"asp":29.8,"coc":0,"risk":"Low","fla":4,"rv":8,"cr":2,"ts":2.5,"fbs":1,"ws":0,"srd":6.7,"bpi":6.8},{"p":"Peter","drs":6.0,"mon":1,"sess":4,"sat":6.6,"nps":1.8,"fbr":3,"asp":26.3,"coc":0,"risk":"Low","fla":7,"rv":11,"cr":1,"ts":5.9,"fbs":1,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Daniel","drs":9.5,"mon":15,"sess":12,"sat":6.2,"nps":-0.8,"fbr":3,"asp":18.1,"coc":0,"risk":"Low","fla":6,"rv":19,"cr":1,"ts":4.9,"fbs":1,"ws":0,"srd":0.0,"bpi":5.1},{"p":"Stefan","drs":3.8,"mon":15,"sess":2,"sat":5.2,"nps":-2.7,"fbr":3,"asp":9.1,"coc":0,"risk":"Med","fla":6,"rv":14,"cr":1,"ts":2.9,"fbs":1,"ws":0,"srd":0.0,"bpi":7.8},{"p":"Thomas","drs":2.6,"mon":11,"sess":2,"sat":5.3,"nps":-3.4,"fbr":3,"asp":20.8,"coc":0,"risk":"Med","fla":2,"rv":17,"cr":3,"ts":2.8,"fbs":0,"ws":0,"srd":4.4,"bpi":5.4},{"p":"Thomas","drs":3.9,"mon":6,"sess":2,"sat":4.6,"nps":-2.4,"fbr":3,"asp":15.8,"coc":0,"risk":"Med","fla":6,"rv":18,"cr":0,"ts":5.3,"fbs":1,"ws":0,"srd":1.9,"bpi":4.7},{"p":"Thomas","drs":1.9,"mon":15,"sess":4,"sat":4.9,"nps":2.4,"fbr":3,"asp":33.5,"coc":0,"risk":"Med","fla":4,"rv":9,"cr":2,"ts":4.8,"fbs":1,"ws":0,"srd":10.2,"bpi":5.1},{"p":"Thomas","drs":4.2,"mon":10,"sess":2,"sat":7.1,"nps":10.0,"fbr":3,"asp":12.8,"coc":0,"risk":"Low","fla":7,"rv":14,"cr":0,"ts":4.8,"fbs":1,"ws":0,"srd":2.8,"bpi":5.1},{"p":"Peter","drs":5.5,"mon":15,"sess":11,"sat":7.2,"nps":4.5,"fbr":3,"asp":44.9,"coc":0,"risk":"Low","fla":8,"rv":15,"cr":2,"ts":3.5,"fbs":0,"ws":0,"srd":0.0,"bpi":5.5},{"p":"Thomas","drs":1.3,"mon":12,"sess":5,"sat":5.0,"nps":1.9,"fbr":3,"asp":43.8,"coc":0,"risk":"Med","fla":6,"rv":8,"cr":0,"ts":3.6,"fbs":0,"ws":0,"srd":1.4,"bpi":5.2},{"p":"Stefan","drs":1.1,"mon":14,"sess":2,"sat":5.2,"nps":-2.0,"fbr":3,"asp":8.5,"coc":0,"risk":"High","fla":3,"rv":17,"cr":5,"ts":7.3,"fbs":2,"ws":0,"srd":1.3,"bpi":7.5},{"p":"Stefan","drs":2.2,"mon":11,"sess":5,"sat":7.2,"nps":-0.8,"fbr":3,"asp":40.1,"coc":0,"risk":"Low","fla":4,"rv":23,"cr":2,"ts":2.6,"fbs":4,"ws":0,"srd":0.0,"bpi":4.8},{"p":"Thomas","drs":3.1,"mon":8,"sess":4,"sat":7.6,"nps":9.8,"fbr":3,"asp":67.0,"coc":0,"risk":"Low","fla":5,"rv":14,"cr":2,"ts":5.1,"fbs":1,"ws":0,"srd":0.0,"bpi":7.8},{"p":"Peter","drs":3.5,"mon":18,"sess":3,"sat":6.6,"nps":1.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":3,"rv":13,"cr":7,"ts":6.6,"fbs":0,"ws":0,"srd":0.0,"bpi":6.9},{"p":"Peter","drs":5.5,"mon":10,"sess":11,"sat":7.9,"nps":7.6,"fbr":3,"asp":66.3,"coc":0,"risk":"Low","fla":5,"rv":21,"cr":1,"ts":4.3,"fbs":0,"ws":0,"srd":4.1,"bpi":6.8},{"p":"Thomas","drs":3.8,"mon":11,"sess":7,"sat":5.7,"nps":1.8,"fbr":3,"asp":12.4,"coc":0,"risk":"Low","fla":8,"rv":10,"cr":3,"ts":7.4,"fbs":5,"ws":1,"srd":0.0,"bpi":6.9},{"p":"Stefan","drs":2.3,"mon":4,"sess":5,"sat":6.2,"nps":4.9,"fbr":3,"asp":22.5,"coc":0,"risk":"Low","fla":8,"rv":16,"cr":0,"ts":4.2,"fbs":0,"ws":0,"srd":2.7,"bpi":5.7},{"p":"Thomas","drs":2.6,"mon":12,"sess":3,"sat":5.5,"nps":3.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":5,"rv":22,"cr":1,"ts":1.4,"fbs":0,"ws":0,"srd":1.3,"bpi":7.3},{"p":"Thomas","drs":4.8,"mon":11,"sess":11,"sat":6.5,"nps":3.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":21,"cr":2,"ts":3.4,"fbs":0,"ws":0,"srd":0.0,"bpi":6.8},{"p":"Daniel","drs":9.5,"mon":3,"sess":16,"sat":7.8,"nps":6.6,"fbr":3,"asp":25.1,"coc":0,"risk":"Low","fla":8,"rv":18,"cr":1,"ts":3.9,"fbs":0,"ws":1,"srd":0.0,"bpi":5.1},{"p":"Stefan","drs":1.9,"mon":1,"sess":3,"sat":4.4,"nps":1.8,"fbr":3,"asp":62.3,"coc":0,"risk":"High","fla":5,"rv":10,"cr":2,"ts":1.8,"fbs":1,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Stefan","drs":1.8,"mon":11,"sess":4,"sat":6.4,"nps":1.8,"fbr":3,"asp":27.9,"coc":0,"risk":"Low","fla":4,"rv":14,"cr":0,"ts":3.4,"fbs":3,"ws":0,"srd":5.0,"bpi":6.5},{"p":"Daniel","drs":8.1,"mon":14,"sess":11,"sat":7.8,"nps":9.5,"fbr":3,"asp":75.8,"coc":0,"risk":"Low","fla":3,"rv":13,"cr":1,"ts":5.3,"fbs":1,"ws":0,"srd":5.8,"bpi":6.5},{"p":"Thomas","drs":3.1,"mon":10,"sess":7,"sat":7.5,"nps":3.2,"fbr":3,"asp":35.5,"coc":0,"risk":"Low","fla":7,"rv":9,"cr":0,"ts":3.6,"fbs":0,"ws":0,"srd":0.0,"bpi":6.0},{"p":"Peter","drs":4.8,"mon":4,"sess":9,"sat":9.0,"nps":8.2,"fbr":3,"asp":76.8,"coc":0,"risk":"Low","fla":4,"rv":17,"cr":4,"ts":3.9,"fbs":1,"ws":0,"srd":0.0,"bpi":5.4},{"p":"Thomas","drs":4.4,"mon":12,"sess":5,"sat":7.2,"nps":6.0,"fbr":3,"asp":60.7,"coc":0,"risk":"Low","fla":4,"rv":17,"cr":2,"ts":6.7,"fbs":1,"ws":1,"srd":4.9,"bpi":4.4},{"p":"Thomas","drs":1.2,"mon":2,"sess":3,"sat":5.8,"nps":-2.5,"fbr":3,"asp":74.3,"coc":0,"risk":"Med","fla":5,"rv":17,"cr":1,"ts":3.3,"fbs":2,"ws":0,"srd":0.0,"bpi":3.6},{"p":"Stefan","drs":4.1,"mon":8,"sess":6,"sat":5.7,"nps":4.9,"fbr":3,"asp":14.1,"coc":0,"risk":"Low","fla":3,"rv":21,"cr":0,"ts":4.9,"fbs":1,"ws":0,"srd":0.0,"bpi":4.2},{"p":"Peter","drs":5.1,"mon":3,"sess":13,"sat":7.2,"nps":5.6,"fbr":3,"asp":43.6,"coc":0,"risk":"Low","fla":5,"rv":14,"cr":8,"ts":1.7,"fbs":0,"ws":0,"srd":1.7,"bpi":7.0},{"p":"Thomas","drs":3.0,"mon":3,"sess":4,"sat":6.5,"nps":10.0,"fbr":3,"asp":13.9,"coc":0,"risk":"Med","fla":4,"rv":13,"cr":1,"ts":2.5,"fbs":0,"ws":0,"srd":0.0,"bpi":3.0},{"p":"Stefan","drs":2.4,"mon":4,"sess":5,"sat":5.0,"nps":5.2,"fbr":3,"asp":19.2,"coc":1,"risk":"Med","fla":6,"rv":17,"cr":3,"ts":4.2,"fbs":1,"ws":0,"srd":4.5,"bpi":4.9},{"p":"Peter","drs":5.0,"mon":7,"sess":4,"sat":6.2,"nps":2.4,"fbr":3,"asp":31.2,"coc":0,"risk":"Low","fla":5,"rv":13,"cr":2,"ts":6.2,"fbs":1,"ws":0,"srd":1.0,"bpi":5.3},{"p":"Thomas","drs":1.4,"mon":1,"sess":3,"sat":6.3,"nps":7.1,"fbr":3,"asp":36.4,"coc":0,"risk":"Med","fla":5,"rv":13,"cr":1,"ts":2.8,"fbs":0,"ws":1,"srd":0.0,"bpi":5.1},{"p":"Stefan","drs":4.3,"mon":7,"sess":3,"sat":6.6,"nps":5.3,"fbr":3,"asp":46.3,"coc":0,"risk":"Low","fla":2,"rv":11,"cr":1,"ts":2.1,"fbs":1,"ws":0,"srd":0.0,"bpi":3.8},{"p":"Thomas","drs":3.5,"mon":9,"sess":6,"sat":6.9,"nps":4.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":10,"cr":4,"ts":4.2,"fbs":0,"ws":0,"srd":0.0,"bpi":6.4},{"p":"Stefan","drs":3.0,"mon":9,"sess":2,"sat":6.1,"nps":-1.9,"fbr":3,"asp":17.3,"coc":0,"risk":"Med","fla":3,"rv":15,"cr":1,"ts":4.3,"fbs":0,"ws":1,"srd":0.0,"bpi":4.3},{"p":"Stefan","drs":3.6,"mon":7,"sess":9,"sat":6.6,"nps":-0.4,"fbr":3,"asp":22.1,"coc":0,"risk":"Low","fla":3,"rv":17,"cr":1,"ts":2.2,"fbs":1,"ws":0,"srd":2.1,"bpi":7.3},{"p":"Stefan","drs":1.3,"mon":15,"sess":4,"sat":6.1,"nps":2.2,"fbr":3,"asp":8.5,"coc":0,"risk":"Med","fla":5,"rv":6,"cr":2,"ts":2.9,"fbs":0,"ws":1,"srd":2.5,"bpi":4.7},{"p":"Daniel","drs":8.1,"mon":3,"sess":23,"sat":7.6,"nps":4.0,"fbr":3,"asp":12.7,"coc":0,"risk":"Low","fla":4,"rv":12,"cr":2,"ts":5.4,"fbs":0,"ws":0,"srd":0.0,"bpi":6.7},{"p":"Peter","drs":4.7,"mon":9,"sess":4,"sat":6.0,"nps":2.6,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":3,"rv":12,"cr":0,"ts":1.6,"fbs":0,"ws":0,"srd":6.4,"bpi":6.1},{"p":"Thomas","drs":4.5,"mon":1,"sess":9,"sat":7.1,"nps":7.6,"fbr":3,"asp":20.6,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":2,"ts":4.4,"fbs":0,"ws":0,"srd":0.0,"bpi":6.4},{"p":"Thomas","drs":1.0,"mon":1,"sess":3,"sat":5.6,"nps":3.4,"fbr":3,"asp":44.3,"coc":0,"risk":"Med","fla":2,"rv":14,"cr":1,"ts":2.9,"fbs":2,"ws":1,"srd":2.5,"bpi":5.4},{"p":"Daniel","drs":7.4,"mon":11,"sess":15,"sat":6.8,"nps":1.9,"fbr":3,"asp":64.6,"coc":0,"risk":"Low","fla":6,"rv":13,"cr":3,"ts":6.9,"fbs":0,"ws":0,"srd":1.0,"bpi":6.2},{"p":"Stefan","drs":1.8,"mon":10,"sess":3,"sat":7.0,"nps":6.3,"fbr":3,"asp":13.9,"coc":0,"risk":"Med","fla":7,"rv":15,"cr":1,"ts":5.5,"fbs":2,"ws":0,"srd":2.3,"bpi":6.0},{"p":"Stefan","drs":3.0,"mon":16,"sess":4,"sat":5.6,"nps":-1.1,"fbr":2,"asp":0.0,"coc":1,"risk":"Med","fla":3,"rv":8,"cr":2,"ts":4.5,"fbs":2,"ws":1,"srd":3.1,"bpi":6.4},{"p":"Daniel","drs":8.1,"mon":10,"sess":16,"sat":7.5,"nps":2.1,"fbr":3,"asp":24.6,"coc":0,"risk":"Low","fla":5,"rv":23,"cr":6,"ts":3.7,"fbs":0,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Stefan","drs":1.7,"mon":18,"sess":5,"sat":6.1,"nps":3.2,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":9,"cr":3,"ts":4.7,"fbs":1,"ws":0,"srd":9.9,"bpi":6.1},{"p":"Thomas","drs":2.6,"mon":1,"sess":3,"sat":6.4,"nps":0.8,"fbr":3,"asp":35.9,"coc":0,"risk":"Med","fla":6,"rv":18,"cr":0,"ts":5.7,"fbs":3,"ws":0,"srd":0.0,"bpi":7.2},{"p":"Stefan","drs":2.4,"mon":2,"sess":3,"sat":6.2,"nps":0.8,"fbr":3,"asp":17.4,"coc":0,"risk":"Med","fla":6,"rv":19,"cr":2,"ts":5.5,"fbs":0,"ws":0,"srd":9.5,"bpi":6.5},{"p":"Thomas","drs":2.4,"mon":1,"sess":1,"sat":3.4,"nps":-0.7,"fbr":3,"asp":57.2,"coc":0,"risk":"High","fla":2,"rv":11,"cr":4,"ts":3.1,"fbs":0,"ws":0,"srd":0.0,"bpi":6.8},{"p":"Stefan","drs":3.5,"mon":3,"sess":3,"sat":5.6,"nps":2.8,"fbr":3,"asp":26.3,"coc":0,"risk":"Med","fla":2,"rv":15,"cr":0,"ts":3.8,"fbs":2,"ws":1,"srd":0.0,"bpi":6.1},{"p":"Thomas","drs":3.1,"mon":10,"sess":2,"sat":6.1,"nps":1.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":5,"rv":9,"cr":3,"ts":0.9,"fbs":0,"ws":0,"srd":1.6,"bpi":4.7},{"p":"Peter","drs":1.5,"mon":12,"sess":8,"sat":6.0,"nps":-2.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":2,"rv":15,"cr":2,"ts":5.9,"fbs":2,"ws":0,"srd":0.0,"bpi":4.5},{"p":"Thomas","drs":3.1,"mon":1,"sess":7,"sat":6.7,"nps":1.6,"fbr":3,"asp":27.5,"coc":0,"risk":"Med","fla":7,"rv":15,"cr":3,"ts":3.7,"fbs":2,"ws":0,"srd":1.6,"bpi":6.2},{"p":"Thomas","drs":2.3,"mon":17,"sess":5,"sat":6.8,"nps":8.5,"fbr":3,"asp":16.7,"coc":0,"risk":"Low","fla":4,"rv":10,"cr":2,"ts":3.1,"fbs":1,"ws":0,"srd":1.5,"bpi":6.8},{"p":"Thomas","drs":1.5,"mon":16,"sess":2,"sat":6.7,"nps":5.8,"fbr":3,"asp":79.1,"coc":0,"risk":"Med","fla":5,"rv":18,"cr":3,"ts":2.8,"fbs":1,"ws":0,"srd":0.0,"bpi":8.8},{"p":"Peter","drs":3.5,"mon":5,"sess":4,"sat":5.6,"nps":4.8,"fbr":3,"asp":26.9,"coc":0,"risk":"Low","fla":7,"rv":13,"cr":1,"ts":5.6,"fbs":3,"ws":1,"srd":0.0,"bpi":7.1},{"p":"Peter","drs":5.1,"mon":2,"sess":17,"sat":6.6,"nps":3.8,"fbr":3,"asp":33.7,"coc":0,"risk":"Low","fla":5,"rv":13,"cr":3,"ts":5.0,"fbs":1,"ws":0,"srd":5.7,"bpi":4.8},{"p":"Thomas","drs":5.1,"mon":3,"sess":17,"sat":8.8,"nps":6.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":7,"rv":13,"cr":1,"ts":4.0,"fbs":0,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Stefan","drs":2.9,"mon":2,"sess":3,"sat":6.4,"nps":5.1,"fbr":3,"asp":70.6,"coc":0,"risk":"Med","fla":1,"rv":13,"cr":5,"ts":0.0,"fbs":0,"ws":0,"srd":0.0,"bpi":8.5},{"p":"Peter","drs":4.3,"mon":2,"sess":5,"sat":6.8,"nps":6.8,"fbr":3,"asp":16.8,"coc":0,"risk":"Low","fla":3,"rv":18,"cr":0,"ts":2.7,"fbs":2,"ws":0,"srd":1.0,"bpi":5.8},{"p":"Stefan","drs":3.0,"mon":10,"sess":5,"sat":6.7,"nps":2.2,"fbr":3,"asp":14.2,"coc":1,"risk":"Low","fla":4,"rv":20,"cr":6,"ts":4.8,"fbs":0,"ws":0,"srd":1.4,"bpi":5.9},{"p":"Stefan","drs":1.9,"mon":4,"sess":5,"sat":7.0,"nps":2.2,"fbr":3,"asp":62.8,"coc":0,"risk":"Low","fla":9,"rv":14,"cr":3,"ts":5.6,"fbs":3,"ws":0,"srd":0.0,"bpi":4.4},{"p":"Thomas","drs":2.7,"mon":7,"sess":5,"sat":5.5,"nps":-2.8,"fbr":3,"asp":55.1,"coc":0,"risk":"Med","fla":4,"rv":23,"cr":2,"ts":4.5,"fbs":0,"ws":0,"srd":3.3,"bpi":7.6},{"p":"Daniel","drs":6.1,"mon":18,"sess":8,"sat":6.3,"nps":0.8,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":11,"cr":3,"ts":3.2,"fbs":1,"ws":0,"srd":0.0,"bpi":7.0},{"p":"Peter","drs":2.9,"mon":13,"sess":6,"sat":5.0,"nps":1.7,"fbr":3,"asp":33.2,"coc":0,"risk":"Med","fla":6,"rv":19,"cr":1,"ts":2.5,"fbs":0,"ws":0,"srd":1.9,"bpi":4.9},{"p":"Peter","drs":4.5,"mon":18,"sess":7,"sat":6.3,"nps":1.1,"fbr":3,"asp":55.2,"coc":0,"risk":"Low","fla":6,"rv":18,"cr":3,"ts":6.4,"fbs":0,"ws":0,"srd":0.0,"bpi":4.9},{"p":"Stefan","drs":2.7,"mon":3,"sess":1,"sat":6.4,"nps":5.1,"fbr":3,"asp":34.9,"coc":0,"risk":"Med","fla":3,"rv":18,"cr":1,"ts":2.2,"fbs":0,"ws":0,"srd":0.0,"bpi":6.1},{"p":"Thomas","drs":3.4,"mon":7,"sess":6,"sat":5.9,"nps":6.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":3,"rv":11,"cr":2,"ts":3.0,"fbs":0,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Thomas","drs":3.0,"mon":10,"sess":5,"sat":7.5,"nps":5.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":5,"rv":14,"cr":2,"ts":2.4,"fbs":1,"ws":0,"srd":1.3,"bpi":6.8},{"p":"Stefan","drs":1.4,"mon":2,"sess":6,"sat":6.1,"nps":2.2,"fbr":2,"asp":0.0,"coc":1,"risk":"Low","fla":7,"rv":15,"cr":1,"ts":6.0,"fbs":0,"ws":0,"srd":2.3,"bpi":6.1},{"p":"Peter","drs":5.7,"mon":1,"sess":8,"sat":6.7,"nps":4.8,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":18,"cr":2,"ts":5.3,"fbs":2,"ws":0,"srd":0.0,"bpi":6.0},{"p":"Peter","drs":3.4,"mon":12,"sess":3,"sat":5.9,"nps":0.4,"fbr":3,"asp":28.3,"coc":0,"risk":"Low","fla":6,"rv":20,"cr":2,"ts":4.1,"fbs":3,"ws":0,"srd":0.0,"bpi":5.2},{"p":"Peter","drs":5.9,"mon":12,"sess":3,"sat":6.0,"nps":0.4,"fbr":3,"asp":25.1,"coc":0,"risk":"Low","fla":4,"rv":20,"cr":2,"ts":5.2,"fbs":2,"ws":0,"srd":0.0,"bpi":6.2},{"p":"Stefan","drs":1.3,"mon":8,"sess":3,"sat":6.2,"nps":0.9,"fbr":2,"asp":0.0,"coc":1,"risk":"Med","fla":7,"rv":13,"cr":5,"ts":2.2,"fbs":2,"ws":0,"srd":0.0,"bpi":4.8},{"p":"Daniel","drs":6.6,"mon":9,"sess":7,"sat":7.0,"nps":1.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":11,"cr":1,"ts":3.4,"fbs":0,"ws":0,"srd":0.0,"bpi":6.4},{"p":"Thomas","drs":1.7,"mon":8,"sess":6,"sat":6.0,"nps":4.2,"fbr":3,"asp":52.4,"coc":0,"risk":"Med","fla":8,"rv":17,"cr":0,"ts":3.6,"fbs":0,"ws":0,"srd":2.0,"bpi":5.6},{"p":"Peter","drs":4.4,"mon":1,"sess":4,"sat":6.6,"nps":2.0,"fbr":3,"asp":69.9,"coc":1,"risk":"Low","fla":5,"rv":19,"cr":4,"ts":6.2,"fbs":1,"ws":0,"srd":3.1,"bpi":5.0},{"p":"Stefan","drs":3.7,"mon":6,"sess":4,"sat":5.6,"nps":4.0,"fbr":3,"asp":56.4,"coc":1,"risk":"Med","fla":5,"rv":11,"cr":4,"ts":4.8,"fbs":3,"ws":0,"srd":12.6,"bpi":6.7},{"p":"Daniel","drs":8.1,"mon":3,"sess":23,"sat":7.3,"nps":5.9,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":3,"ts":4.7,"fbs":2,"ws":0,"srd":1.4,"bpi":6.4},{"p":"Thomas","drs":4.7,"mon":2,"sess":7,"sat":6.9,"nps":3.7,"fbr":3,"asp":38.3,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":4,"ts":3.8,"fbs":2,"ws":0,"srd":0.0,"bpi":5.1},{"p":"Stefan","drs":3.1,"mon":18,"sess":2,"sat":6.6,"nps":5.2,"fbr":3,"asp":39.4,"coc":0,"risk":"Med","fla":2,"rv":11,"cr":2,"ts":4.5,"fbs":1,"ws":0,"srd":0.0,"bpi":5.4},{"p":"Daniel","drs":6.2,"mon":11,"sess":8,"sat":7.2,"nps":2.0,"fbr":3,"asp":22.2,"coc":0,"risk":"Low","fla":3,"rv":20,"cr":0,"ts":2.2,"fbs":0,"ws":0,"srd":2.4,"bpi":6.7},{"p":"Thomas","drs":3.1,"mon":13,"sess":3,"sat":6.2,"nps":0.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":7,"rv":12,"cr":0,"ts":2.9,"fbs":1,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Stefan","drs":1.6,"mon":6,"sess":3,"sat":6.4,"nps":4.6,"fbr":3,"asp":21.9,"coc":0,"risk":"Med","fla":5,"rv":14,"cr":3,"ts":4.0,"fbs":1,"ws":0,"srd":9.1,"bpi":6.0},{"p":"Stefan","drs":4.1,"mon":7,"sess":6,"sat":6.9,"nps":-1.7,"fbr":3,"asp":39.7,"coc":0,"risk":"Low","fla":6,"rv":12,"cr":4,"ts":2.8,"fbs":1,"ws":0,"srd":0.0,"bpi":7.1},{"p":"Stefan","drs":1.1,"mon":4,"sess":6,"sat":6.6,"nps":3.2,"fbr":3,"asp":23.4,"coc":0,"risk":"Med","fla":7,"rv":13,"cr":2,"ts":5.8,"fbs":0,"ws":0,"srd":7.3,"bpi":7.0},{"p":"Thomas","drs":4.6,"mon":2,"sess":12,"sat":7.5,"nps":6.5,"fbr":3,"asp":41.1,"coc":0,"risk":"Low","fla":2,"rv":13,"cr":0,"ts":2.9,"fbs":0,"ws":0,"srd":2.5,"bpi":6.5},{"p":"Stefan","drs":3.6,"mon":3,"sess":2,"sat":6.4,"nps":6.1,"fbr":3,"asp":29.5,"coc":0,"risk":"Low","fla":7,"rv":12,"cr":0,"ts":3.0,"fbs":1,"ws":0,"srd":4.6,"bpi":4.6},{"p":"Thomas","drs":5.7,"mon":15,"sess":9,"sat":7.1,"nps":8.0,"fbr":3,"asp":28.0,"coc":0,"risk":"Low","fla":5,"rv":18,"cr":1,"ts":2.9,"fbs":0,"ws":0,"srd":1.3,"bpi":6.0},{"p":"Thomas","drs":3.0,"mon":12,"sess":5,"sat":7.7,"nps":5.1,"fbr":3,"asp":38.4,"coc":0,"risk":"Low","fla":5,"rv":14,"cr":1,"ts":5.3,"fbs":1,"ws":0,"srd":4.7,"bpi":4.6},{"p":"Stefan","drs":3.4,"mon":10,"sess":7,"sat":7.4,"nps":6.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":7,"rv":12,"cr":2,"ts":0.5,"fbs":0,"ws":0,"srd":11.8,"bpi":7.9},{"p":"Stefan","drs":5.2,"mon":9,"sess":13,"sat":6.7,"nps":1.4,"fbr":3,"asp":16.0,"coc":0,"risk":"Low","fla":6,"rv":13,"cr":0,"ts":2.9,"fbs":1,"ws":0,"srd":3.3,"bpi":8.6},{"p":"Peter","drs":4.3,"mon":17,"sess":5,"sat":5.3,"nps":-0.5,"fbr":2,"asp":0.0,"coc":1,"risk":"Low","fla":5,"rv":14,"cr":0,"ts":6.1,"fbs":0,"ws":0,"srd":0.0,"bpi":6.8},{"p":"Stefan","drs":1.0,"mon":2,"sess":2,"sat":6.0,"nps":5.4,"fbr":2,"asp":34.6,"coc":1,"risk":"Med","fla":0,"rv":15,"cr":1,"ts":2.7,"fbs":0,"ws":1,"srd":0.0,"bpi":6.4},{"p":"Stefan","drs":1.0,"mon":5,"sess":3,"sat":6.2,"nps":2.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":7,"rv":15,"cr":2,"ts":5.6,"fbs":0,"ws":0,"srd":3.1,"bpi":5.7},{"p":"Daniel","drs":8.4,"mon":6,"sess":18,"sat":8.9,"nps":8.2,"fbr":3,"asp":15.8,"coc":0,"risk":"Low","fla":5,"rv":17,"cr":1,"ts":4.9,"fbs":1,"ws":0,"srd":0.0,"bpi":7.3},{"p":"Thomas","drs":1.2,"mon":14,"sess":2,"sat":4.6,"nps":-3.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":5,"rv":9,"cr":4,"ts":3.4,"fbs":2,"ws":0,"srd":1.6,"bpi":3.5},{"p":"Thomas","drs":3.1,"mon":18,"sess":7,"sat":6.7,"nps":4.5,"fbr":3,"asp":35.0,"coc":0,"risk":"Med","fla":6,"rv":8,"cr":2,"ts":1.7,"fbs":1,"ws":0,"srd":4.0,"bpi":5.7},{"p":"Thomas","drs":4.0,"mon":4,"sess":6,"sat":7.2,"nps":6.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":8,"rv":12,"cr":3,"ts":2.6,"fbs":0,"ws":0,"srd":3.7,"bpi":4.9},{"p":"Peter","drs":5.2,"mon":16,"sess":11,"sat":7.3,"nps":6.4,"fbr":3,"asp":41.0,"coc":0,"risk":"Low","fla":4,"rv":15,"cr":2,"ts":1.9,"fbs":0,"ws":0,"srd":4.2,"bpi":6.6},{"p":"Thomas","drs":4.0,"mon":15,"sess":3,"sat":6.6,"nps":0.2,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":6,"rv":16,"cr":3,"ts":5.0,"fbs":0,"ws":1,"srd":1.1,"bpi":5.9},{"p":"Peter","drs":5.3,"mon":4,"sess":6,"sat":6.4,"nps":5.3,"fbr":3,"asp":23.7,"coc":0,"risk":"Low","fla":4,"rv":14,"cr":0,"ts":4.9,"fbs":1,"ws":0,"srd":3.4,"bpi":8.6},{"p":"Stefan","drs":4.0,"mon":7,"sess":4,"sat":6.4,"nps":0.3,"fbr":3,"asp":30.3,"coc":0,"risk":"Low","fla":1,"rv":18,"cr":4,"ts":2.3,"fbs":2,"ws":0,"srd":0.0,"bpi":7.1},{"p":"Peter","drs":3.9,"mon":7,"sess":5,"sat":7.0,"nps":3.9,"fbr":3,"asp":29.8,"coc":0,"risk":"Low","fla":3,"rv":20,"cr":2,"ts":3.9,"fbs":2,"ws":1,"srd":0.0,"bpi":6.3},{"p":"Stefan","drs":1.7,"mon":18,"sess":1,"sat":6.1,"nps":-1.8,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":11,"cr":2,"ts":3.6,"fbs":0,"ws":0,"srd":3.7,"bpi":5.2},{"p":"Stefan","drs":1.6,"mon":3,"sess":2,"sat":5.5,"nps":0.6,"fbr":3,"asp":15.7,"coc":0,"risk":"High","fla":5,"rv":12,"cr":1,"ts":4.1,"fbs":1,"ws":1,"srd":0.0,"bpi":7.5},{"p":"Stefan","drs":3.5,"mon":15,"sess":6,"sat":8.2,"nps":3.9,"fbr":3,"asp":35.1,"coc":0,"risk":"Low","fla":4,"rv":12,"cr":2,"ts":2.8,"fbs":1,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Thomas","drs":4.6,"mon":6,"sess":11,"sat":5.4,"nps":-0.3,"fbr":3,"asp":9.6,"coc":0,"risk":"Low","fla":5,"rv":12,"cr":1,"ts":6.5,"fbs":1,"ws":1,"srd":1.7,"bpi":6.5},{"p":"Stefan","drs":3.0,"mon":13,"sess":4,"sat":6.5,"nps":3.1,"fbr":3,"asp":5.7,"coc":0,"risk":"Low","fla":2,"rv":18,"cr":1,"ts":4.6,"fbs":1,"ws":0,"srd":1.7,"bpi":5.9},{"p":"Thomas","drs":4.9,"mon":8,"sess":12,"sat":6.5,"nps":5.1,"fbr":3,"asp":43.5,"coc":0,"risk":"Low","fla":2,"rv":9,"cr":0,"ts":3.2,"fbs":1,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Daniel","drs":6.1,"mon":11,"sess":21,"sat":7.7,"nps":7.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":14,"cr":3,"ts":3.2,"fbs":2,"ws":0,"srd":0.0,"bpi":6.5},{"p":"Stefan","drs":4.5,"mon":15,"sess":13,"sat":5.3,"nps":-5.2,"fbr":3,"asp":21.1,"coc":0,"risk":"Low","fla":5,"rv":18,"cr":5,"ts":3.0,"fbs":0,"ws":0,"srd":2.0,"bpi":3.7},{"p":"Thomas","drs":5.3,"mon":15,"sess":11,"sat":7.8,"nps":7.3,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":13,"cr":2,"ts":4.5,"fbs":0,"ws":0,"srd":0.0,"bpi":4.4},{"p":"Peter","drs":5.9,"mon":16,"sess":15,"sat":8.4,"nps":7.3,"fbr":2,"asp":0.0,"coc":1,"risk":"Low","fla":6,"rv":16,"cr":1,"ts":3.6,"fbs":2,"ws":0,"srd":0.0,"bpi":6.8},{"p":"Peter","drs":7.1,"mon":1,"sess":17,"sat":7.5,"nps":3.6,"fbr":3,"asp":30.0,"coc":1,"risk":"Low","fla":4,"rv":12,"cr":0,"ts":4.1,"fbs":0,"ws":0,"srd":4.7,"bpi":8.5},{"p":"Peter","drs":3.0,"mon":13,"sess":6,"sat":6.1,"nps":-0.0,"fbr":3,"asp":35.5,"coc":0,"risk":"Low","fla":9,"rv":20,"cr":1,"ts":2.6,"fbs":1,"ws":0,"srd":3.8,"bpi":6.2},{"p":"Thomas","drs":2.9,"mon":3,"sess":7,"sat":6.8,"nps":3.4,"fbr":3,"asp":24.2,"coc":0,"risk":"Med","fla":7,"rv":13,"cr":2,"ts":3.9,"fbs":2,"ws":0,"srd":0.0,"bpi":4.9},{"p":"Daniel","drs":6.6,"mon":8,"sess":8,"sat":7.1,"nps":4.8,"fbr":3,"asp":42.5,"coc":0,"risk":"Low","fla":2,"rv":15,"cr":0,"ts":3.4,"fbs":1,"ws":0,"srd":0.0,"bpi":4.8},{"p":"Peter","drs":5.9,"mon":10,"sess":11,"sat":7.8,"nps":6.5,"fbr":3,"asp":37.6,"coc":0,"risk":"Low","fla":3,"rv":21,"cr":2,"ts":5.4,"fbs":1,"ws":0,"srd":6.6,"bpi":7.3},{"p":"Thomas","drs":2.2,"mon":7,"sess":5,"sat":5.9,"nps":1.3,"fbr":3,"asp":49.5,"coc":1,"risk":"Low","fla":4,"rv":13,"cr":1,"ts":2.6,"fbs":2,"ws":0,"srd":0.0,"bpi":5.0},{"p":"Peter","drs":5.9,"mon":10,"sess":7,"sat":6.6,"nps":-3.1,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":20,"cr":1,"ts":2.3,"fbs":1,"ws":0,"srd":2.1,"bpi":7.2},{"p":"Peter","drs":6.6,"mon":18,"sess":7,"sat":8.0,"nps":4.8,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":7,"rv":9,"cr":5,"ts":4.9,"fbs":0,"ws":0,"srd":8.3,"bpi":7.0},{"p":"Peter","drs":5.8,"mon":3,"sess":7,"sat":7.6,"nps":2.2,"fbr":3,"asp":43.5,"coc":0,"risk":"Low","fla":4,"rv":12,"cr":0,"ts":4.3,"fbs":0,"ws":0,"srd":0.0,"bpi":6.9},{"p":"Thomas","drs":3.8,"mon":12,"sess":5,"sat":6.2,"nps":7.5,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":2,"ts":1.5,"fbs":1,"ws":0,"srd":5.1,"bpi":6.0},{"p":"Thomas","drs":2.3,"mon":7,"sess":2,"sat":6.1,"nps":2.3,"fbr":2,"asp":0.0,"coc":0,"risk":"High","fla":5,"rv":11,"cr":0,"ts":1.3,"fbs":0,"ws":0,"srd":0.0,"bpi":6.1},{"p":"Peter","drs":4.0,"mon":2,"sess":3,"sat":6.3,"nps":4.5,"fbr":3,"asp":13.6,"coc":0,"risk":"Low","fla":3,"rv":13,"cr":0,"ts":2.6,"fbs":1,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Thomas","drs":5.0,"mon":3,"sess":7,"sat":6.7,"nps":5.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":3,"rv":6,"cr":0,"ts":2.9,"fbs":2,"ws":0,"srd":2.5,"bpi":5.4},{"p":"Thomas","drs":4.4,"mon":18,"sess":2,"sat":7.1,"nps":5.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":7,"rv":11,"cr":3,"ts":6.4,"fbs":0,"ws":1,"srd":1.3,"bpi":4.9},{"p":"Stefan","drs":2.5,"mon":16,"sess":3,"sat":6.2,"nps":1.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":3,"rv":15,"cr":4,"ts":1.9,"fbs":3,"ws":1,"srd":0.0,"bpi":3.0},{"p":"Peter","drs":4.5,"mon":17,"sess":8,"sat":5.9,"nps":0.4,"fbr":3,"asp":27.4,"coc":0,"risk":"Low","fla":8,"rv":11,"cr":4,"ts":5.5,"fbs":0,"ws":1,"srd":0.0,"bpi":5.9},{"p":"Stefan","drs":1.0,"mon":18,"sess":1,"sat":6.4,"nps":-2.3,"fbr":3,"asp":31.8,"coc":0,"risk":"Med","fla":8,"rv":18,"cr":1,"ts":2.3,"fbs":1,"ws":0,"srd":0.0,"bpi":7.2},{"p":"Stefan","drs":1.2,"mon":4,"sess":6,"sat":5.6,"nps":1.6,"fbr":2,"asp":0.0,"coc":1,"risk":"Med","fla":5,"rv":22,"cr":2,"ts":4.9,"fbs":0,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Daniel","drs":9.8,"mon":6,"sess":12,"sat":6.8,"nps":4.4,"fbr":3,"asp":10.0,"coc":1,"risk":"Low","fla":5,"rv":15,"cr":2,"ts":6.4,"fbs":1,"ws":0,"srd":0.0,"bpi":7.4},{"p":"Stefan","drs":1.0,"mon":12,"sess":5,"sat":6.7,"nps":3.3,"fbr":3,"asp":26.3,"coc":0,"risk":"Med","fla":3,"rv":16,"cr":1,"ts":3.9,"fbs":1,"ws":0,"srd":1.9,"bpi":4.5},{"p":"Peter","drs":5.2,"mon":9,"sess":13,"sat":6.6,"nps":3.6,"fbr":3,"asp":56.8,"coc":0,"risk":"Low","fla":3,"rv":10,"cr":3,"ts":2.5,"fbs":1,"ws":0,"srd":10.4,"bpi":7.4},{"p":"Thomas","drs":4.7,"mon":8,"sess":11,"sat":5.7,"nps":-1.6,"fbr":3,"asp":21.4,"coc":0,"risk":"Low","fla":6,"rv":15,"cr":3,"ts":6.2,"fbs":2,"ws":0,"srd":2.1,"bpi":6.0},{"p":"Stefan","drs":1.0,"mon":7,"sess":5,"sat":6.6,"nps":2.5,"fbr":3,"asp":15.7,"coc":0,"risk":"Med","fla":5,"rv":17,"cr":2,"ts":4.8,"fbs":2,"ws":1,"srd":2.2,"bpi":7.3},{"p":"Peter","drs":5.2,"mon":11,"sess":11,"sat":6.8,"nps":2.0,"fbr":3,"asp":26.9,"coc":0,"risk":"Low","fla":4,"rv":11,"cr":1,"ts":4.2,"fbs":1,"ws":1,"srd":0.0,"bpi":5.1},{"p":"Stefan","drs":3.6,"mon":11,"sess":3,"sat":7.2,"nps":6.1,"fbr":3,"asp":21.3,"coc":0,"risk":"Med","fla":6,"rv":18,"cr":3,"ts":3.0,"fbs":1,"ws":0,"srd":0.0,"bpi":5.0},{"p":"Stefan","drs":2.5,"mon":3,"sess":3,"sat":7.3,"nps":4.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":3,"rv":14,"cr":0,"ts":4.0,"fbs":2,"ws":0,"srd":0.0,"bpi":4.7},{"p":"Stefan","drs":5.9,"mon":9,"sess":15,"sat":7.3,"nps":3.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":12,"rv":17,"cr":3,"ts":4.8,"fbs":1,"ws":0,"srd":0.0,"bpi":4.6},{"p":"Thomas","drs":1.5,"mon":10,"sess":4,"sat":4.2,"nps":-2.0,"fbr":2,"asp":0.0,"coc":0,"risk":"High","fla":1,"rv":14,"cr":2,"ts":3.4,"fbs":0,"ws":0,"srd":0.0,"bpi":4.4},{"p":"Thomas","drs":4.8,"mon":10,"sess":11,"sat":5.3,"nps":-2.0,"fbr":3,"asp":30.1,"coc":1,"risk":"Low","fla":6,"rv":23,"cr":1,"ts":5.0,"fbs":0,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Peter","drs":4.8,"mon":4,"sess":6,"sat":6.1,"nps":1.4,"fbr":3,"asp":62.7,"coc":0,"risk":"Low","fla":1,"rv":22,"cr":3,"ts":5.7,"fbs":0,"ws":0,"srd":1.6,"bpi":5.3},{"p":"Peter","drs":5.9,"mon":14,"sess":11,"sat":6.9,"nps":5.3,"fbr":3,"asp":48.4,"coc":0,"risk":"Low","fla":6,"rv":20,"cr":3,"ts":4.2,"fbs":0,"ws":1,"srd":5.9,"bpi":3.0},{"p":"Peter","drs":5.5,"mon":1,"sess":8,"sat":7.6,"nps":1.9,"fbr":3,"asp":18.9,"coc":0,"risk":"Low","fla":1,"rv":14,"cr":2,"ts":2.9,"fbs":1,"ws":0,"srd":0.0,"bpi":7.6},{"p":"Peter","drs":4.1,"mon":6,"sess":4,"sat":6.6,"nps":3.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":18,"cr":3,"ts":5.1,"fbs":1,"ws":0,"srd":0.0,"bpi":4.0},{"p":"Stefan","drs":2.8,"mon":14,"sess":5,"sat":8.2,"nps":4.5,"fbr":3,"asp":32.6,"coc":0,"risk":"Low","fla":3,"rv":16,"cr":2,"ts":3.6,"fbs":2,"ws":1,"srd":0.0,"bpi":6.5},{"p":"Stefan","drs":1.0,"mon":10,"sess":7,"sat":4.7,"nps":-3.9,"fbr":3,"asp":54.8,"coc":0,"risk":"Med","fla":3,"rv":13,"cr":1,"ts":3.8,"fbs":2,"ws":0,"srd":0.0,"bpi":5.4},{"p":"Peter","drs":5.7,"mon":5,"sess":7,"sat":7.3,"nps":9.3,"fbr":3,"asp":21.9,"coc":0,"risk":"Low","fla":5,"rv":15,"cr":3,"ts":3.7,"fbs":0,"ws":0,"srd":0.0,"bpi":8.9},{"p":"Stefan","drs":2.9,"mon":13,"sess":1,"sat":5.5,"nps":4.1,"fbr":2,"asp":0.0,"coc":0,"risk":"High","fla":5,"rv":9,"cr":1,"ts":3.5,"fbs":0,"ws":0,"srd":0.0,"bpi":7.0},{"p":"Stefan","drs":3.3,"mon":10,"sess":3,"sat":6.5,"nps":1.5,"fbr":3,"asp":18.4,"coc":0,"risk":"Med","fla":5,"rv":24,"cr":2,"ts":5.6,"fbs":2,"ws":0,"srd":2.0,"bpi":5.3},{"p":"Peter","drs":6.3,"mon":15,"sess":6,"sat":8.8,"nps":6.9,"fbr":3,"asp":29.1,"coc":0,"risk":"Low","fla":9,"rv":23,"cr":2,"ts":8.3,"fbs":0,"ws":0,"srd":0.0,"bpi":5.6},{"p":"Peter","drs":5.4,"mon":14,"sess":7,"sat":8.1,"nps":1.1,"fbr":3,"asp":34.4,"coc":1,"risk":"Low","fla":3,"rv":17,"cr":4,"ts":1.4,"fbs":1,"ws":0,"srd":2.2,"bpi":8.1},{"p":"Thomas","drs":3.7,"mon":11,"sess":5,"sat":6.9,"nps":-0.2,"fbr":3,"asp":43.9,"coc":0,"risk":"Low","fla":3,"rv":19,"cr":1,"ts":2.4,"fbs":1,"ws":0,"srd":0.0,"bpi":4.2},{"p":"Thomas","drs":2.4,"mon":9,"sess":4,"sat":7.2,"nps":1.6,"fbr":3,"asp":16.2,"coc":0,"risk":"Low","fla":6,"rv":15,"cr":1,"ts":4.2,"fbs":0,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Daniel","drs":6.6,"mon":2,"sess":10,"sat":7.6,"nps":5.1,"fbr":3,"asp":29.5,"coc":0,"risk":"Low","fla":6,"rv":16,"cr":2,"ts":4.5,"fbs":0,"ws":0,"srd":0.0,"bpi":6.4},{"p":"Stefan","drs":3.9,"mon":5,"sess":9,"sat":5.5,"nps":0.7,"fbr":3,"asp":11.1,"coc":0,"risk":"Med","fla":3,"rv":8,"cr":3,"ts":3.0,"fbs":0,"ws":0,"srd":0.0,"bpi":5.6},{"p":"Daniel","drs":9.2,"mon":8,"sess":22,"sat":7.9,"nps":6.6,"fbr":3,"asp":26.0,"coc":0,"risk":"Low","fla":7,"rv":15,"cr":1,"ts":4.0,"fbs":0,"ws":1,"srd":0.0,"bpi":7.5},{"p":"Stefan","drs":2.2,"mon":11,"sess":6,"sat":5.6,"nps":2.9,"fbr":3,"asp":29.9,"coc":0,"risk":"Med","fla":4,"rv":13,"cr":1,"ts":2.1,"fbs":2,"ws":0,"srd":0.0,"bpi":5.9},{"p":"Stefan","drs":2.6,"mon":9,"sess":7,"sat":6.8,"nps":4.3,"fbr":3,"asp":60.4,"coc":0,"risk":"Med","fla":1,"rv":21,"cr":2,"ts":2.8,"fbs":0,"ws":0,"srd":2.6,"bpi":6.3},{"p":"Thomas","drs":2.4,"mon":5,"sess":6,"sat":5.5,"nps":-1.7,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":7,"rv":19,"cr":1,"ts":5.9,"fbs":0,"ws":0,"srd":0.0,"bpi":5.8},{"p":"Stefan","drs":3.9,"mon":1,"sess":4,"sat":6.2,"nps":3.2,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":7,"rv":9,"cr":2,"ts":4.3,"fbs":0,"ws":0,"srd":2.7,"bpi":6.5},{"p":"Daniel","drs":8.3,"mon":9,"sess":20,"sat":8.4,"nps":8.4,"fbr":3,"asp":40.7,"coc":0,"risk":"Low","fla":2,"rv":13,"cr":2,"ts":4.6,"fbs":0,"ws":0,"srd":2.6,"bpi":7.0},{"p":"Daniel","drs":9.8,"mon":5,"sess":19,"sat":8.5,"nps":5.9,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":5,"rv":18,"cr":1,"ts":2.3,"fbs":1,"ws":0,"srd":0.0,"bpi":6.4},{"p":"Peter","drs":3.9,"mon":14,"sess":1,"sat":6.8,"nps":-1.0,"fbr":3,"asp":26.2,"coc":0,"risk":"Med","fla":6,"rv":11,"cr":1,"ts":6.5,"fbs":0,"ws":0,"srd":3.1,"bpi":6.0},{"p":"Thomas","drs":3.0,"mon":1,"sess":5,"sat":8.0,"nps":9.0,"fbr":3,"asp":22.8,"coc":0,"risk":"Low","fla":9,"rv":15,"cr":2,"ts":4.3,"fbs":0,"ws":0,"srd":6.1,"bpi":4.9},{"p":"Thomas","drs":3.8,"mon":11,"sess":8,"sat":8.3,"nps":6.8,"fbr":3,"asp":19.2,"coc":0,"risk":"Low","fla":3,"rv":19,"cr":1,"ts":4.6,"fbs":0,"ws":0,"srd":0.0,"bpi":5.0},{"p":"Stefan","drs":3.3,"mon":17,"sess":2,"sat":5.7,"nps":-5.5,"fbr":3,"asp":37.7,"coc":0,"risk":"Med","fla":4,"rv":14,"cr":2,"ts":3.7,"fbs":1,"ws":0,"srd":0.0,"bpi":5.5},{"p":"Peter","drs":4.7,"mon":3,"sess":13,"sat":8.2,"nps":10.0,"fbr":3,"asp":6.8,"coc":1,"risk":"Low","fla":10,"rv":19,"cr":2,"ts":4.8,"fbs":2,"ws":1,"srd":0.0,"bpi":6.0},{"p":"Thomas","drs":2.5,"mon":9,"sess":4,"sat":8.1,"nps":5.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":10,"cr":3,"ts":4.1,"fbs":0,"ws":0,"srd":6.1,"bpi":5.7},{"p":"Stefan","drs":3.6,"mon":2,"sess":4,"sat":7.5,"nps":10.0,"fbr":3,"asp":33.0,"coc":0,"risk":"Low","fla":4,"rv":14,"cr":3,"ts":4.9,"fbs":2,"ws":0,"srd":5.8,"bpi":7.0},{"p":"Daniel","drs":8.4,"mon":12,"sess":9,"sat":8.2,"nps":7.3,"fbr":3,"asp":57.6,"coc":0,"risk":"Low","fla":4,"rv":13,"cr":2,"ts":8.1,"fbs":0,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Daniel","drs":6.4,"mon":10,"sess":10,"sat":5.9,"nps":1.3,"fbr":3,"asp":37.4,"coc":0,"risk":"Low","fla":7,"rv":13,"cr":4,"ts":5.8,"fbs":0,"ws":0,"srd":1.3,"bpi":6.7},{"p":"Stefan","drs":4.1,"mon":7,"sess":4,"sat":5.8,"nps":2.1,"fbr":3,"asp":22.9,"coc":0,"risk":"Med","fla":8,"rv":14,"cr":4,"ts":5.8,"fbs":0,"ws":0,"srd":0.0,"bpi":6.2},{"p":"Stefan","drs":3.9,"mon":10,"sess":2,"sat":5.9,"nps":0.0,"fbr":3,"asp":10.6,"coc":0,"risk":"Med","fla":6,"rv":18,"cr":1,"ts":6.4,"fbs":0,"ws":0,"srd":0.0,"bpi":5.2},{"p":"Stefan","drs":2.7,"mon":17,"sess":8,"sat":7.4,"nps":5.0,"fbr":3,"asp":13.0,"coc":0,"risk":"Low","fla":6,"rv":18,"cr":3,"ts":5.5,"fbs":0,"ws":0,"srd":0.0,"bpi":5.8},{"p":"Stefan","drs":2.6,"mon":3,"sess":4,"sat":5.5,"nps":6.0,"fbr":3,"asp":20.6,"coc":1,"risk":"Med","fla":3,"rv":15,"cr":1,"ts":3.7,"fbs":0,"ws":0,"srd":0.0,"bpi":6.9},{"p":"Peter","drs":5.7,"mon":1,"sess":7,"sat":6.6,"nps":1.0,"fbr":3,"asp":21.1,"coc":0,"risk":"Low","fla":5,"rv":18,"cr":0,"ts":4.8,"fbs":0,"ws":0,"srd":0.0,"bpi":6.6},{"p":"Stefan","drs":1.5,"mon":16,"sess":5,"sat":7.0,"nps":5.3,"fbr":3,"asp":56.1,"coc":0,"risk":"Low","fla":6,"rv":12,"cr":3,"ts":5.8,"fbs":0,"ws":0,"srd":5.8,"bpi":5.8},{"p":"Thomas","drs":3.5,"mon":11,"sess":4,"sat":6.2,"nps":0.6,"fbr":3,"asp":15.0,"coc":0,"risk":"Low","fla":2,"rv":20,"cr":3,"ts":5.7,"fbs":3,"ws":0,"srd":0.0,"bpi":5.1},{"p":"Peter","drs":2.4,"mon":16,"sess":1,"sat":6.0,"nps":1.6,"fbr":3,"asp":21.4,"coc":0,"risk":"Med","fla":8,"rv":11,"cr":0,"ts":2.4,"fbs":1,"ws":0,"srd":0.0,"bpi":8.0},{"p":"Thomas","drs":4.6,"mon":11,"sess":9,"sat":7.1,"nps":9.1,"fbr":3,"asp":16.8,"coc":0,"risk":"Low","fla":5,"rv":8,"cr":0,"ts":1.0,"fbs":1,"ws":0,"srd":1.4,"bpi":5.3},{"p":"Thomas","drs":1.6,"mon":15,"sess":1,"sat":7.0,"nps":5.3,"fbr":3,"asp":31.5,"coc":0,"risk":"Med","fla":4,"rv":18,"cr":4,"ts":6.1,"fbs":0,"ws":1,"srd":1.4,"bpi":3.5},{"p":"Daniel","drs":9.3,"mon":8,"sess":17,"sat":8.7,"nps":9.3,"fbr":3,"asp":10.4,"coc":0,"risk":"Low","fla":4,"rv":13,"cr":1,"ts":2.9,"fbs":3,"ws":0,"srd":0.0,"bpi":8.1},{"p":"Daniel","drs":7.1,"mon":14,"sess":17,"sat":8.0,"nps":6.2,"fbr":3,"asp":37.0,"coc":0,"risk":"Low","fla":2,"rv":20,"cr":4,"ts":1.2,"fbs":0,"ws":0,"srd":0.0,"bpi":6.5},{"p":"Peter","drs":4.7,"mon":17,"sess":11,"sat":6.8,"nps":10.0,"fbr":3,"asp":80.9,"coc":0,"risk":"Low","fla":5,"rv":14,"cr":2,"ts":1.8,"fbs":0,"ws":0,"srd":0.0,"bpi":5.8},{"p":"Peter","drs":4.2,"mon":11,"sess":4,"sat":5.0,"nps":-2.4,"fbr":3,"asp":35.5,"coc":0,"risk":"Low","fla":5,"rv":17,"cr":2,"ts":7.4,"fbs":1,"ws":0,"srd":9.9,"bpi":5.4},{"p":"Stefan","drs":2.2,"mon":3,"sess":5,"sat":6.2,"nps":-1.5,"fbr":3,"asp":7.4,"coc":0,"risk":"Med","fla":4,"rv":17,"cr":3,"ts":5.3,"fbs":1,"ws":1,"srd":6.1,"bpi":7.9},{"p":"Thomas","drs":5.2,"mon":5,"sess":10,"sat":6.8,"nps":7.8,"fbr":3,"asp":40.5,"coc":0,"risk":"Low","fla":2,"rv":15,"cr":2,"ts":2.4,"fbs":1,"ws":0,"srd":0.0,"bpi":6.7},{"p":"Thomas","drs":1.0,"mon":4,"sess":7,"sat":6.5,"nps":2.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":4,"rv":10,"cr":2,"ts":2.4,"fbs":0,"ws":0,"srd":0.0,"bpi":6.1},{"p":"Thomas","drs":5.0,"mon":4,"sess":10,"sat":6.4,"nps":3.8,"fbr":3,"asp":43.8,"coc":0,"risk":"Low","fla":4,"rv":17,"cr":0,"ts":4.4,"fbs":1,"ws":0,"srd":3.4,"bpi":6.4},{"p":"Thomas","drs":3.9,"mon":6,"sess":6,"sat":6.9,"nps":8.1,"fbr":3,"asp":20.3,"coc":0,"risk":"Low","fla":1,"rv":15,"cr":3,"ts":4.4,"fbs":0,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Stefan","drs":1.1,"mon":10,"sess":3,"sat":6.2,"nps":3.5,"fbr":3,"asp":33.8,"coc":0,"risk":"Med","fla":8,"rv":11,"cr":2,"ts":4.4,"fbs":0,"ws":0,"srd":7.2,"bpi":7.1},{"p":"Stefan","drs":1.2,"mon":11,"sess":3,"sat":5.6,"nps":6.8,"fbr":3,"asp":30.4,"coc":0,"risk":"Med","fla":4,"rv":10,"cr":2,"ts":2.5,"fbs":0,"ws":0,"srd":14.0,"bpi":5.1},{"p":"Stefan","drs":4.5,"mon":8,"sess":9,"sat":6.1,"nps":2.5,"fbr":3,"asp":21.9,"coc":0,"risk":"Low","fla":10,"rv":11,"cr":1,"ts":7.1,"fbs":0,"ws":0,"srd":0.0,"bpi":4.4},{"p":"Thomas","drs":2.4,"mon":11,"sess":3,"sat":6.7,"nps":1.6,"fbr":3,"asp":13.8,"coc":0,"risk":"Low","fla":6,"rv":11,"cr":1,"ts":4.2,"fbs":0,"ws":0,"srd":3.8,"bpi":6.7},{"p":"Peter","drs":3.6,"mon":2,"sess":3,"sat":7.0,"nps":-1.9,"fbr":3,"asp":49.4,"coc":0,"risk":"Med","fla":3,"rv":19,"cr":1,"ts":4.0,"fbs":0,"ws":0,"srd":0.0,"bpi":6.5},{"p":"Stefan","drs":3.9,"mon":2,"sess":7,"sat":5.8,"nps":2.4,"fbr":3,"asp":30.8,"coc":1,"risk":"Low","fla":6,"rv":12,"cr":3,"ts":5.1,"fbs":0,"ws":0,"srd":3.8,"bpi":6.1},{"p":"Stefan","drs":2.9,"mon":3,"sess":5,"sat":6.0,"nps":-3.6,"fbr":3,"asp":24.1,"coc":0,"risk":"Med","fla":4,"rv":18,"cr":1,"ts":0.8,"fbs":2,"ws":0,"srd":0.0,"bpi":6.3},{"p":"Stefan","drs":1.4,"mon":10,"sess":2,"sat":6.3,"nps":3.4,"fbr":3,"asp":19.3,"coc":0,"risk":"Med","fla":3,"rv":11,"cr":4,"ts":4.2,"fbs":2,"ws":1,"srd":0.0,"bpi":5.0},{"p":"Thomas","drs":3.8,"mon":4,"sess":2,"sat":6.9,"nps":7.4,"fbr":3,"asp":29.3,"coc":0,"risk":"Low","fla":2,"rv":19,"cr":2,"ts":4.4,"fbs":0,"ws":0,"srd":5.2,"bpi":6.0},{"p":"Thomas","drs":2.3,"mon":5,"sess":4,"sat":6.2,"nps":2.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Med","fla":3,"rv":17,"cr":1,"ts":1.5,"fbs":3,"ws":0,"srd":0.0,"bpi":5.5},{"p":"Thomas","drs":4.8,"mon":7,"sess":6,"sat":6.7,"nps":3.9,"fbr":3,"asp":38.2,"coc":0,"risk":"Low","fla":5,"rv":10,"cr":1,"ts":1.0,"fbs":0,"ws":1,"srd":0.0,"bpi":5.5},{"p":"Peter","drs":6.3,"mon":15,"sess":13,"sat":7.8,"nps":7.9,"fbr":3,"asp":31.9,"coc":0,"risk":"Low","fla":3,"rv":8,"cr":3,"ts":2.6,"fbs":0,"ws":0,"srd":0.0,"bpi":7.9},{"p":"Daniel","drs":8.1,"mon":1,"sess":15,"sat":8.4,"nps":8.5,"fbr":3,"asp":21.1,"coc":0,"risk":"Low","fla":4,"rv":13,"cr":2,"ts":4.1,"fbs":0,"ws":0,"srd":1.8,"bpi":5.1},{"p":"Thomas","drs":3.9,"mon":12,"sess":9,"sat":5.7,"nps":4.3,"fbr":3,"asp":18.4,"coc":1,"risk":"Low","fla":3,"rv":19,"cr":0,"ts":4.3,"fbs":0,"ws":0,"srd":1.5,"bpi":8.8},{"p":"Daniel","drs":9.6,"mon":12,"sess":26,"sat":9.7,"nps":9.4,"fbr":3,"asp":70.6,"coc":0,"risk":"Low","fla":6,"rv":14,"cr":3,"ts":7.2,"fbs":0,"ws":0,"srd":5.3,"bpi":8.2},{"p":"Daniel","drs":7.5,"mon":15,"sess":22,"sat":8.3,"nps":1.0,"fbr":3,"asp":32.2,"coc":0,"risk":"Low","fla":5,"rv":12,"cr":1,"ts":4.3,"fbs":0,"ws":1,"srd":2.3,"bpi":4.6},{"p":"Peter","drs":3.6,"mon":17,"sess":4,"sat":7.3,"nps":7.5,"fbr":3,"asp":19.7,"coc":0,"risk":"Low","fla":5,"rv":14,"cr":0,"ts":2.0,"fbs":0,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Stefan","drs":3.0,"mon":1,"sess":4,"sat":5.6,"nps":0.6,"fbr":3,"asp":11.6,"coc":0,"risk":"Low","fla":4,"rv":20,"cr":6,"ts":3.8,"fbs":0,"ws":0,"srd":0.0,"bpi":5.6},{"p":"Stefan","drs":5.0,"mon":3,"sess":18,"sat":7.5,"nps":2.8,"fbr":3,"asp":18.5,"coc":0,"risk":"Low","fla":4,"rv":16,"cr":1,"ts":2.5,"fbs":0,"ws":0,"srd":1.4,"bpi":6.7},{"p":"Daniel","drs":6.3,"mon":16,"sess":6,"sat":7.1,"nps":5.0,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":6,"rv":18,"cr":4,"ts":4.1,"fbs":0,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Stefan","drs":2.1,"mon":8,"sess":4,"sat":4.9,"nps":0.3,"fbr":3,"asp":49.3,"coc":0,"risk":"Med","fla":4,"rv":11,"cr":3,"ts":6.0,"fbs":1,"ws":0,"srd":0.0,"bpi":5.7},{"p":"Stefan","drs":3.0,"mon":10,"sess":3,"sat":5.4,"nps":-1.1,"fbr":3,"asp":48.3,"coc":0,"risk":"Med","fla":6,"rv":19,"cr":3,"ts":5.7,"fbs":2,"ws":1,"srd":2.1,"bpi":5.7},{"p":"Thomas","drs":3.4,"mon":12,"sess":5,"sat":5.5,"nps":-2.2,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":11,"cr":3,"ts":2.5,"fbs":0,"ws":0,"srd":2.3,"bpi":5.0},{"p":"Thomas","drs":2.3,"mon":13,"sess":3,"sat":4.9,"nps":1.0,"fbr":3,"asp":42.6,"coc":0,"risk":"Med","fla":5,"rv":14,"cr":3,"ts":5.1,"fbs":1,"ws":0,"srd":0.0,"bpi":4.6},{"p":"Thomas","drs":4.8,"mon":17,"sess":18,"sat":7.7,"nps":3.3,"fbr":3,"asp":14.9,"coc":0,"risk":"Low","fla":5,"rv":16,"cr":1,"ts":3.0,"fbs":1,"ws":0,"srd":0.0,"bpi":7.3},{"p":"Stefan","drs":5.3,"mon":18,"sess":10,"sat":6.8,"nps":3.9,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":4,"rv":20,"cr":0,"ts":0.0,"fbs":3,"ws":0,"srd":11.1,"bpi":4.2},{"p":"Stefan","drs":2.7,"mon":13,"sess":4,"sat":7.1,"nps":5.1,"fbr":3,"asp":29.4,"coc":0,"risk":"Low","fla":5,"rv":11,"cr":1,"ts":2.1,"fbs":3,"ws":0,"srd":4.6,"bpi":6.3},{"p":"Daniel","drs":6.4,"mon":5,"sess":9,"sat":6.0,"nps":4.4,"fbr":2,"asp":0.0,"coc":0,"risk":"Low","fla":3,"rv":15,"cr":1,"ts":4.2,"fbs":1,"ws":0,"srd":0.0,"bpi":7.4},{"p":"Thomas","drs":1.6,"mon":16,"sess":2,"sat":5.9,"nps":7.1,"fbr":3,"asp":26.1,"coc":1,"risk":"Med","fla":4,"rv":12,"cr":0,"ts":4.9,"fbs":0,"ws":0,"srd":0.0,"bpi":5.3},{"p":"Stefan","drs":2.8,"mon":1,"sess":4,"sat":5.3,"nps":1.2,"fbr":3,"asp":25.7,"coc":0,"risk":"Med","fla":6,"rv":14,"cr":1,"ts":6.9,"fbs":1,"ws":0,"srd":3.3,"bpi":5.8}];

// Monthly snapshots: at product month M, these are the aggregated metrics
// for all users who had registered by that point (reconstructed from tenure data)
const SNAP = [{"m":1,"n":17,"nps":3.06,"sat":6.78,"asp":19.55,"ts":3.56,"fbr":2.59,"ret":64.7},{"m":2,"n":34,"nps":3.27,"sat":6.67,"asp":22.82,"ts":3.77,"fbr":2.71,"ret":73.5},{"m":3,"n":46,"nps":3.36,"sat":6.65,"asp":22.49,"ts":3.72,"fbr":2.67,"ret":67.4},{"m":4,"n":68,"nps":3.23,"sat":6.67,"asp":21.74,"ts":3.9,"fbr":2.69,"ret":67.6},{"m":5,"n":81,"nps":3.27,"sat":6.7,"asp":22.61,"ts":3.95,"fbr":2.7,"ret":67.9},{"m":6,"n":93,"nps":3.18,"sat":6.62,"asp":22.35,"ts":3.89,"fbr":2.71,"ret":66.7},{"m":7,"n":116,"nps":3.13,"sat":6.58,"asp":23.31,"ts":4.02,"fbr":2.72,"ret":65.5},{"m":8,"n":145,"nps":3.09,"sat":6.58,"asp":24.31,"ts":4.06,"fbr":2.74,"ret":68.3},{"m":9,"n":169,"nps":3.03,"sat":6.58,"asp":24.19,"ts":4.07,"fbr":2.75,"ret":65.7},{"m":10,"n":187,"nps":3.13,"sat":6.62,"asp":23.76,"ts":4.06,"fbr":2.73,"ret":65.8},{"m":11,"n":206,"nps":3.18,"sat":6.66,"asp":23.75,"ts":4.1,"fbr":2.74,"ret":66.0},{"m":12,"n":231,"nps":3.11,"sat":6.64,"asp":24.2,"ts":4.06,"fbr":2.75,"ret":65.4},{"m":13,"n":246,"nps":3.19,"sat":6.64,"asp":23.74,"ts":4.08,"fbr":2.75,"ret":65.4},{"m":14,"n":260,"nps":3.23,"sat":6.62,"asp":23.24,"ts":4.05,"fbr":2.74,"ret":65.0},{"m":15,"n":274,"nps":3.27,"sat":6.62,"asp":23.7,"ts":4.07,"fbr":2.74,"ret":65.3},{"m":16,"n":300,"nps":3.37,"sat":6.64,"asp":23.53,"ts":4.04,"fbr":2.74,"ret":65.0},{"m":17,"n":323,"nps":3.41,"sat":6.64,"asp":23.97,"ts":4.04,"fbr":2.75,"ret":65.0},{"m":18,"n":350,"nps":3.36,"sat":6.63,"asp":24.06,"ts":4.06,"fbr":2.75,"ret":65.4}];

// ── TOKENS ────────────────────────────────────────────────────────────────────
const C = { bg:"#f0f2f5",card:"#ffffff",header:"#0d1117",border:"#e4e7ec",
            t1:"#0d1117",t2:"#4b5563",t3:"#9ca3af" };
const S = {
  achieved:{ bar:"#059669",bg:"#d1fae5",text:"#065f46",icon:"✓",label:"Logrado"  },
  exceeded:{ bar:"#059669",bg:"#d1fae5",text:"#065f46",icon:"✓",label:"Superado" },
  on_track:{ bar:"#2563eb",bg:"#dbeafe",text:"#1e40af",icon:"→",label:"En camino"},
  at_risk: { bar:"#d97706",bg:"#fef3c7",text:"#92400e",icon:"!",label:"En riesgo"},
};
const PM = [
  {id:"P1",short:"Conocimiento",color:"#92400e",bg:"#fef3c7"},
  {id:"P2",short:"Soluciones",  color:"#1e3a8a",bg:"#dbeafe"},
  {id:"P3",short:"Organización",color:"#4c1d95",bg:"#ede9fe"},
  {id:"P4",short:"Feedback",    color:"#064e3b",bg:"#d1fae5"},
  {id:"P5",short:"Alineación",  color:"#7f1d1d",bg:"#fee2e2"},
  {id:"P6",short:"Experiencia", color:"#14532d",bg:"#dcfce7"},
];
const PC = {Thomas:"#92400e",Stefan:"#7f1d1d",Peter:"#1e3a8a",Daniel:"#064e3b"};
const PERSONAS = ["Thomas","Stefan","Peter","Daniel"];
const PFULL = {Thomas:"Traditional Thomas",Stefan:"Skeptical Stefan",Peter:"Pragmatic Peter",Daniel:"Digital Daniel"};

// ── KR FRAMEWORK ──────────────────────────────────────────────────────────────
const KR_FRAME = [
  { pid:"P1", krs:[
    {k:"KR1",label:"Entrevistas contextuales completadas",    val:"100%", target:"100%",pct:100,status:"achieved"},
    {k:"KR2",label:"Pain points no articulados identificados",val:"6",    target:"6",   pct:100,status:"achieved"},
    {k:"KR3",label:"Feedback surveys / usuario / mes",        val:"0.62", target:"1.0", pct:62, status:"on_track"},
    {k:"KR4",label:"Workshop participation rate",             val:"16%",  target:"25%", pct:64, status:"on_track"},
  ]},
  { pid:"P2", krs:[
    {k:"KR1",label:"Casos de uso prioritarios lanzados",      val:"3/10", target:"3",   pct:100,status:"achieved"},
    {k:"KR2",label:"Aprobación en testing de prototipo",      val:"85%",  target:"70%", pct:100,status:"exceeded"},
    {k:"KR3",label:"Feature usage breadth (de 5 funciones)",  val:"2.8/5",target:"5/5", pct:56, status:"at_risk"},
    {k:"KR4",label:"Custom recipes creadas / usuario / mes",  val:"2.1",  target:"3.0", pct:70, status:"on_track"},
  ]},
  { pid:"P3", krs:[
    {k:"KR1",label:"Departamentos activos en desarrollo",      val:"8",   target:"7",   pct:100,status:"exceeded"},
    {k:"KR2",label:"Función asesor digital creada y activa",   val:"Sí",  target:"Sí",  pct:100,status:"achieved"},
    {k:"KR3",label:"Tasa de co-creación de usuarios activos",  val:"8%",  target:"15%", pct:53, status:"at_risk"},
    {k:"KR4",label:"Canales de retroalimentación activos",     val:"2",   target:"2",   pct:100,status:"achieved"},
  ]},
  { pid:"P4", krs:[
    {k:"KR1",label:"Rondas de testing con clientes reales",   val:"2",    target:"2",   pct:100,status:"achieved"},
    {k:"KR2",label:"NPS promedio de usuarios activos",         val:"3.9",  target:"7.0", pct:56, status:"at_risk"},
    {k:"KR3",label:"Tiempo de resolución de soporte (días)",   val:"2.3",  target:"≤3",  pct:100,status:"achieved"},
    {k:"KR4",label:"Feature requests incorporadas en ciclo",   val:"68%",  target:"80%", pct:85, status:"on_track"},
  ]},
  { pid:"P5", krs:[
    {k:"KR1",label:"Apoyo público del CEO declarado",          val:"Sí",  target:"Sí",  pct:100,status:"achieved"},
    {k:"KR2",label:"Percepción de innovación de marca (1-10)", val:"5.8", target:"7.5", pct:77, status:"on_track"},
    {k:"KR3",label:"Reviews quincenales de KPIs con CEO",      val:"Sí",  target:"Sí",  pct:100,status:"achieved"},
    {k:"KR4",label:"Especialista en marketing digital integrado",val:"Sí",target:"Sí",  pct:100,status:"achieved"},
  ]},
  { pid:"P6", krs:[
    {k:"KR1",label:"Adopción de mercado en mes 6",             val:"11.5%",target:"10%", pct:100,status:"exceeded"},
    {k:"KR2",label:"Satisfacción promedio de usuarios (1-10)", val:"6.5",  target:"7.5", pct:86, status:"on_track"},
    {k:"KR3",label:"App spend penetration promedio",           val:"23%",  target:"35%", pct:67, status:"on_track"},
    {k:"KR4",label:"Tasa de retención de usuarios activos",    val:"92.6%",target:"90%", pct:100,status:"achieved"},
  ]},
];

const PILL_DETAIL = {
  P1:{objective:"Desarrollar comprensión profunda y continua de los desafíos reales del carnicero alemán.",
    kpis:[{label:"Surveys/usuario/mes",value:"0.62",trend:"+12%",ok:true},{label:"Workshop participation",value:"16%",trend:"+4%",ok:true},{label:"Co-creation rate",value:"8%",trend:"gap vs 15%",ok:false}]},
  P2:{objective:"Construir soluciones que resuelvan demandas latentes, no solo las explícitas del cliente.",
    kpis:[{label:"Feature breadth avg",value:"2.8/5",trend:"+0.3",ok:true},{label:"Food labeling/mes",value:"4.6",trend:"+8%",ok:true},{label:"Recipe views/mes",value:"14.8",trend:"+5%",ok:true}]},
  P3:{objective:"Hacer que el conocimiento del cliente fluya por toda la organización de RAPS.",
    kpis:[{label:"Depts con KPIs cliente",value:"8/9",trend:"estable",ok:true},{label:"Co-creation rate",value:"8%",trend:"gap vs 15%",ok:false},{label:"Canales feedback",value:"2 activos",trend:"—",ok:true}]},
  P4:{objective:"Integrar retroalimentación del cliente en cada etapa del ciclo de desarrollo.",
    kpis:[{label:"NPS avg",value:"3.9",trend:"bajo objetivo",ok:false},{label:"Resolución soporte",value:"2.3d",trend:"−0.5",ok:true},{label:"Feature req/usuario",value:"0.28",trend:"+0.05",ok:true}]},
  P5:{objective:"Anclar la innovación centrada en el cliente en la estrategia y liderazgo de RAPS.",
    kpis:[{label:"Brand innovation score",value:"5.8/10",trend:"gap 1.7pts",ok:false},{label:"CEO KPI reviews",value:"quincenal",trend:"activo",ok:true},{label:"Digital specialist",value:"contratado",trend:"integrado",ok:true}]},
  P6:{objective:"Entregar experiencia digital al nivel de calidad RAPS que genere crecimiento sostenible.",
    kpis:[{label:"Market penetration mes 6",value:"11.5%",trend:"+3.2%",ok:true},{label:"Tasa de retención",value:"92.6%",trend:"+1.2%",ok:true},{label:"Satisfacción avg",value:"6.5/10",trend:"gap 1pt",ok:false}]},
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const pm  = id => PM.find(p=>p.id===id);
const fmt = (n,d=1) => Number(n).toFixed(d);

// ── TOOLTIPS ──────────────────────────────────────────────────────────────────
const TipArea = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:"#fff",border:"0.5px solid #e4e7ec",borderRadius:8,padding:"10px 14px",fontSize:11,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
      <div style={{fontWeight:700,color:"#0d1117",marginBottom:5}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.stroke||p.fill||"#4b5563",marginTop:2}}>
          {p.name}: <strong>{typeof p.value==="number"?fmt(p.value,1):p.value}</strong>
        </div>
      ))}
    </div>
  );
};

const TipRadar = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:"#fff",border:"0.5px solid #e4e7ec",borderRadius:8,padding:"10px 14px",fontSize:11}}>
      <div style={{fontWeight:700,color:"#0d1117",marginBottom:5}}>{label}</div>
      {payload.map((p,i)=><div key={i} style={{color:p.stroke||"#2563eb"}}>{p.name}: <strong>{p.value}</strong>/10</div>)}
    </div>
  );
};

const TipGap = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  const val = payload[0]?.value||0;
  const fill = payload[0]?.fill||"#2563eb";
  return (
    <div style={{background:"#fff",border:"0.5px solid #e4e7ec",borderRadius:8,padding:"10px 14px",fontSize:11}}>
      <div style={{fontWeight:700,color:"#0d1117",marginBottom:5}}>{label}</div>
      <div>Progreso: <strong style={{color:fill}}>{val}%</strong></div>
      <div style={{color:"#9ca3af"}}>Brecha: <strong style={{color:"#dc2626"}}>−{100-val}%</strong></div>
    </div>
  );
};

const GapBarLabel = ({x,y,width,height,value}) => (
  <g>
    <text x={x+width+6}  y={y+height/2} dominantBaseline="central" fontSize={10} fontWeight={700} fill={value<60?"#d97706":"#2563eb"}>{value}%</text>
    <text x={x+width+42} y={y+height/2} dominantBaseline="central" fontSize={9} fill="#9ca3af">−{100-value}%</text>
  </g>
);

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function HeroCard({Icon,label,value,pctRaw,status,target}){
  const s=S[status];
  const capped = Math.min(Math.round(pctRaw||0), 100);
  return(
    <div style={{background:C.card,borderRadius:10,padding:"13px 14px 11px",border:`0.5px solid ${C.border}`,display:"flex",flexDirection:"column",gap:8,transition:"all .3s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <span style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em",lineHeight:1.3}}>{label}</span>
        <Icon size={13} color={s.bar}/>
      </div>
      <div style={{fontSize:22,fontWeight:700,color:C.t1,lineHeight:1,letterSpacing:"-0.03em",transition:"all .3s"}}>{value}</div>
      <div style={{background:"#e4e7ec",borderRadius:3,height:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${capped}%`,background:s.bar,borderRadius:3,transition:"width .5s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:10,color:C.t3}}>→ {target}</span>
        <span style={{fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:10,background:s.bg,color:s.text}}>{s.icon} {capped}%</span>
      </div>
    </div>
  );
}

function MatrixCell({kr,override,onClick,dimmed}){
  const [hov,setHov]=useState(false);
  // If persona is selected and this KR has live data, use it; otherwise use framework values
  const display = override || kr;
  const s = S[display.status] || S[kr.status];
  const isLive = !!override;
  const deltaVal = override?.delta;
  const deltaPos = deltaVal > 0;
  return(
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      title={`${kr.label}\nActual (segmento): ${display.val} → Target: ${display.target}`}
      style={{borderRadius:7,padding:"8px 9px",cursor:"pointer",
        background:dimmed?"#f9fafb":hov?s.bg:isLive?"#fafff9":"#fafafa",
        border:`1.5px solid ${dimmed?"#e4e7ec":isLive?s.bar+"88":hov?s.bar:"#e4e7ec"}`,
        opacity:dimmed?0.25:1,transition:"all .15s",
        display:"flex",flexDirection:"column",gap:5,
        outline:isLive?`1.5px solid ${s.bar}22`:undefined}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:3,alignItems:"center"}}>
        <span style={{fontSize:8.5,color:s.text,fontWeight:700,padding:"1px 5px",borderRadius:8,background:s.bg}}>{s.icon} {s.label}</span>
        <div style={{display:"flex",alignItems:"center",gap:3}}>
          {isLive && deltaVal!==undefined && (
            <span style={{fontSize:8,fontWeight:700,color:deltaPos?"#059669":"#dc2626"}}>
              {deltaPos?`▲${Math.abs(deltaVal).toFixed(1)}`:`▼${Math.abs(deltaVal).toFixed(1)}`}
            </span>
          )}
          <span style={{fontSize:11,fontWeight:700,color:s.bar,flexShrink:0}}>{display.pct}%</span>
        </div>
      </div>
      <div style={{fontSize:8.5,color:C.t2,lineHeight:1.35,minHeight:22}}>{kr.label}</div>
      <div style={{background:"rgba(0,0,0,.07)",borderRadius:3,height:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${Math.min(display.pct,100)}%`,background:s.bar,borderRadius:3,transition:"width .4s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:8.5,color:isLive?s.bar:C.t3,fontWeight:isLive?700:400}}>{display.val} / {display.target}</span>
        {isLive && <span style={{fontSize:7.5,color:C.t3,background:"#f0fdf4",padding:"0 4px",borderRadius:4}}>live</span>}
      </div>
    </div>
  );
}

function PillarSideCell({id,selected,atRisk,onClick}){
  const meta=pm(id);
  const healthMap={P1:82,P2:82,P3:88,P4:85,P5:94,P6:88};
  return(
    <div onClick={onClick}
      style={{borderRadius:8,padding:"10px 11px",cursor:"pointer",
        background:selected?meta.bg:"#fafafa",
        border:`1.5px solid ${selected?meta.color:"#e4e7ec"}`,
        transition:"all .13s",display:"flex",flexDirection:"column",gap:5}}>
      <div style={{fontSize:10,fontWeight:700,color:meta.color}}>{id}</div>
      <div style={{fontSize:8.5,color:C.t2,lineHeight:1.3}}>{meta.short}</div>
      <div style={{display:"flex",alignItems:"baseline",gap:2}}>
        <span style={{fontSize:18,fontWeight:700,color:meta.color,lineHeight:1}}>{healthMap[id]}</span>
        <span style={{fontSize:8,color:C.t3}}>/100</span>
      </div>
      {atRisk>0&&<div style={{fontSize:8.5,color:"#92400e",background:"#fef3c7",borderRadius:8,padding:"1px 6px",fontWeight:700,alignSelf:"flex-start"}}>{atRisk} riesgo</div>}
    </div>
  );
}

function PillarDetail({id,onClose,animated}){
  const meta=pm(id); const frame=KR_FRAME.find(p=>p.pid===id); const detail=PILL_DETAIL[id];
  const [filt,setFilt]=useState("all");
  if(!meta||!frame||!detail) return null;
  const vis=filt==="all"?frame.krs:frame.krs.filter(kr=>
    filt==="at_risk"?kr.status==="at_risk":filt==="on_track"?kr.status==="on_track":
    kr.status==="achieved"||kr.status==="exceeded"
  );
  return(
    <div style={{background:C.card,borderRadius:12,padding:"20px 22px",border:`2px solid ${meta.color}`,marginTop:14,boxShadow:`0 0 0 4px ${meta.bg}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div style={{display:"flex",gap:12}}>
          <div style={{width:4,minHeight:44,borderRadius:2,background:meta.color,alignSelf:"stretch"}}/>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:meta.color,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{id} · {meta.short}</div>
            <div style={{fontSize:12,color:C.t2,lineHeight:1.6,maxWidth:640}}>{detail.objective}</div>
          </div>
        </div>
        <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:11,color:C.t2,fontWeight:600}}>✕ Cerrar</button>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:12}}>
        <span style={{fontSize:10,color:C.t3,marginRight:4}}>Filtrar:</span>
        {[["all","Todos"],["achieved","✓ Logrado"],["on_track","→ Camino"],["at_risk","! Riesgo"]].map(([f,lbl])=>(
          <button key={f} onClick={()=>setFilt(f)} style={{fontSize:9.5,padding:"3px 10px",borderRadius:12,cursor:"pointer",
            border:`1px solid ${filt===f?meta.color:C.border}`,background:filt===f?meta.color:"transparent",
            color:filt===f?"#fff":C.t2,fontWeight:filt===f?700:400,transition:"all .12s"}}>{lbl}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {vis.map((kr,i)=>{const s=S[kr.status];return(
          <div key={i} style={{background:"#f9fafb",borderRadius:8,padding:"13px 14px",border:"0.5px solid #e4e7ec"}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:8,alignItems:"flex-start"}}>
              <span style={{fontSize:11,color:C.t2,lineHeight:1.4,flex:1}}>{kr.label}</span>
              <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:s.bg,color:s.text,whiteSpace:"nowrap",flexShrink:0}}>{s.icon} {s.label}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{flex:1,background:"#e4e7ec",borderRadius:4,height:6,overflow:"hidden"}}>
                <div style={{height:"100%",background:s.bar,width:animated?`${Math.min(kr.pct,100)}%`:"0%",borderRadius:4,transition:"width .85s cubic-bezier(.4,0,.2,1)"}}/>
              </div>
              <span style={{fontSize:12,fontWeight:700,color:C.t1,minWidth:32,textAlign:"right"}}>{kr.pct}%</span>
            </div>
            <div style={{fontSize:10,color:C.t3,marginTop:5}}>Actual: {kr.val} · Target: {kr.target}</div>
          </div>
        );})}
        {vis.length===0&&<div style={{gridColumn:"span 2",textAlign:"center",padding:"20px",color:C.t3,fontSize:12}}>No hay KRs con este estado en este pilar.</div>}
      </div>
      <div style={{borderTop:`0.5px solid ${C.border}`,paddingTop:12}}>
        <div style={{fontSize:9,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>KPIs de seguimiento</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {detail.kpis.map((kpi,i)=>(
            <div key={i} style={{background:"#f9fafb",borderRadius:8,padding:"11px 8px",textAlign:"center",border:`0.5px solid ${C.border}`}}>
              <div style={{fontSize:20,fontWeight:700,color:meta.color,lineHeight:1,marginBottom:4}}>{kpi.value}</div>
              <div style={{fontSize:10,color:C.t2,lineHeight:1.3,marginBottom:4}}>{kpi.label}</div>
              <div style={{fontSize:10,fontWeight:700,color:kpi.ok?"#059669":"#d97706"}}>{kpi.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TIME SLIDER SECTION ───────────────────────────────────────────────────────
function TimelineSection({selPersona}) {
  const [month, setMonth] = useState(6);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  // Filter snapshots by persona if needed
  const snapshots = useMemo(() => {
    if (selPersona === "all") return SNAP;
    // Recompute snapshots for the selected persona
    return Array.from({length:18},(_,i) => {
      const M = i+1;
      const users = RAW.filter(r => r.p === selPersona && (18 - r.mon + 1) <= M);
      if (!users.length) return {m:M,n:0,nps:0,sat:0,asp:0,ts:0,fbr:0,ret:0};
      const a = k => parseFloat((users.reduce((s,r)=>s+(+r[k]||0),0)/users.length).toFixed(2));
      const p = fn => parseFloat((users.filter(fn).length/users.length*100).toFixed(1));
      return {m:M,n:users.length,nps:a("nps"),sat:a("sat"),asp:a("asp"),ts:a("ts"),fbr:a("fbr"),ret:p(r=>r.risk==="Low")};
    });
  }, [selPersona]);

  const snap = snapshots[month-1] || snapshots[0];

  // Autoplay
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setMonth(m => { if(m>=18){setPlaying(false);return 18;} return m+1; });
      }, 600);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  // Adoption curve data — up to current month
  const adoptionLine = snapshots.map(s => ({
    month: `M${s.m}`,
    usuarios: s.n,
    nps: s.nps,
    sat: s.sat,
  }));

  // Milestone labels
  const milestones = {6:"🏁 Hito mes 6", 12:"📊 Mes 12", 18:"📈 Mes 18"};

  const snapStatus = (val, target) => val >= target ? "achieved" : val >= target * 0.75 ? "on_track" : "at_risk";

  return (
    <div style={{marginTop:20,marginBottom:20}}>

      {/* Section header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:14}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:C.t1,letterSpacing:"-0.01em"}}>
            Evolución de métricas · mes a mes
          </div>
          <div style={{fontSize:9.5,color:C.t3,marginTop:2}}>
            Reproduce el crecimiento de myRAzept desde el lanzamiento · arrastra el slider o presiona play
          </div>
        </div>
        {selPersona !== "all" && (
          <div style={{fontSize:10,fontWeight:700,color:PC[selPersona],background:PC[selPersona]+"18",padding:"3px 10px",borderRadius:20,border:`1px solid ${PC[selPersona]}44`}}>
            Segmento: {PFULL[selPersona]}
          </div>
        )}
      </div>

      {/* Main timeline card */}
      <div style={{background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"20px 22px"}}>

        {/* ── SLIDER CONTROLS ── */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
          <button
            onClick={()=>setPlaying(p=>!p)}
            style={{background:playing?"#dc2626":"#0d1117",border:"none",borderRadius:8,padding:"7px 14px",cursor:"pointer",
              color:"#fff",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            {playing?<><Pause size={12}/> Pausar</>:<><Play size={12}/> Reproducir</>}
          </button>

          <div style={{flex:1,position:"relative"}}>
            {/* Track */}
            <div style={{position:"relative",height:6,borderRadius:3,background:"#e4e7ec",cursor:"pointer"}}>
              <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${(month-1)/17*100}%`,background:"#0d1117",borderRadius:3,transition:"width .15s"}}/>
              {/* Milestone ticks */}
              {[6,12,18].map(m=>(
                <div key={m} style={{position:"absolute",top:"50%",left:`${(m-1)/17*100}%`,transform:"translate(-50%,-50%)",
                  width:10,height:10,borderRadius:"50%",background:month>=m?"#0d1117":"#d1d5db",border:"2px solid #fff",zIndex:2,transition:"background .2s"}}/>
              ))}
            </div>
            <input type="range" min={1} max={18} value={month} onChange={e=>setMonth(+e.target.value)}
              style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer",zIndex:3}}/>
            {/* Month labels */}
            <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
              {[1,3,6,9,12,15,18].map(m=>(
                <div key={m} style={{fontSize:9,color:month===m?"#0d1117":C.t3,fontWeight:month===m?700:400,textAlign:"center",transition:"color .2s"}}>
                  M{m}{milestones[m]?<br/>:null}{milestones[m]?<span style={{fontSize:8}}>{milestones[m]}</span>:null}
                </div>
              ))}
            </div>
          </div>

          <div style={{textAlign:"center",flexShrink:0,minWidth:80}}>
            <div style={{fontSize:28,fontWeight:700,color:"#0d1117",lineHeight:1,letterSpacing:"-0.03em"}}>M{month}</div>
            <div style={{fontSize:10,color:C.t3}}>{snap.n} usuarios</div>
          </div>
        </div>

        {/* ── LIVE KPI STRIP (changes as slider moves) ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:20,padding:"14px 16px",background:"#f8fafc",borderRadius:10,border:"0.5px solid #e4e7ec"}}>
          {[
            {label:"Usuarios activos",value:snap.n,unit:"",target:1150,pct:Math.round(snap.n/1150*100),color:"#0d1117"},
            {label:"NPS promedio",    value:fmt(snap.nps),unit:" pts",target:7.0,pct:Math.round(Math.max(0,snap.nps/7)*100),color:snap.nps<5?"#d97706":"#059669"},
            {label:"Satisfacción",   value:fmt(snap.sat),unit:"/10", target:7.5,pct:Math.round(snap.sat/7.5*100),color:"#2563eb"},
            {label:"App spend",      value:fmt(snap.asp,0),unit:"%",  target:35, pct:Math.round(snap.asp/35*100),color:"#7c3aed"},
            {label:"Retención",      value:fmt(snap.ret,1),unit:"%",  target:90, pct:Math.round(snap.ret/90*100),color:"#059669"},
          ].map((kpi,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:9,color:C.t3,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{kpi.label}</div>
              <div style={{fontSize:20,fontWeight:700,color:kpi.color,lineHeight:1,transition:"all .3s"}}>{kpi.value}{kpi.unit}</div>
              <div style={{background:"#e4e7ec",borderRadius:3,height:3,margin:"6px 0 3px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min(kpi.pct,100)}%`,background:kpi.color,borderRadius:3,transition:"width .4s ease"}}/>
              </div>
              <div style={{fontSize:9,color:C.t3}}>{kpi.pct}% del target</div>
            </div>
          ))}
        </div>

        {/* ── Inline legend: current month context, lives OUTSIDE charts ── */}
        <div style={{display:"flex",gap:16,marginBottom:12,padding:"8px 12px",background:"#f8fafc",borderRadius:8,border:"0.5px solid #e4e7ec",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:12,height:2,background:"#0d1117",borderRadius:1}}/>
            <span style={{fontSize:9.5,color:C.t2,fontWeight:600}}>Mes actual: M{month}</span>
          </div>
          {month>=6&&<div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:12,height:2,background:"#d97706",borderRadius:1,borderTop:"1px dashed #d97706"}}/>
            <span style={{fontSize:9.5,color:"#d97706",fontWeight:600}}>Hito mes 6 · {snapshots[5]?.n||0} usuarios · NPS {fmt(snapshots[5]?.nps||0)}</span>
          </div>}
          {month>=12&&<div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#4c1d95"}}/>
            <span style={{fontSize:9.5,color:"#4c1d95",fontWeight:600}}>Mes 12 · NPS {fmt(snapshots[11]?.nps||0)} ({fmt((snapshots[11]?.nps||0)-(snapshots[5]?.nps||0),1)} vs mes 6)</span>
          </div>}
          <div style={{marginLeft:"auto",fontSize:9.5,color:C.t3}}>
            {selPersona==="all"?"Todos los usuarios":PFULL[selPersona]} · {snap.n} activos a M{month}
          </div>
        </div>
        {/* ── CHARTS (adoption curve + NPS trend, side by side) ── */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

          {/* Adoption area chart — highlighted up to current month */}
          <div>
            <div style={{fontSize:9,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>
              Curva de adopción · usuarios acumulados
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={adoptionLine} margin={{top:8,right:8,left:0,bottom:0}}>
                <defs>
                  <linearGradient id="gradAll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#94a3b8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:8.5,fill:C.t3}}/>
                <YAxis tick={{fontSize:8.5,fill:C.t3}}/>
                <Tooltip content={<TipArea/>}/>
                <ReferenceLine x={`M${month}`} stroke="#0d1117" strokeWidth={2} strokeDasharray="4 2"/>
                {month >= 6 && <ReferenceLine x="M6" stroke="#d97706" strokeWidth={1} strokeDasharray="4 2"/>}
                <Area type="monotone" dataKey="usuarios" name="Usuarios activos"
                  stroke="#2563eb" strokeWidth={2} fill="url(#gradActive)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* NPS + satisfaction line trend */}
          <div>
            <div style={{fontSize:9,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>
              NPS y satisfacción · evolución acumulada
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={adoptionLine.slice(0,month)} margin={{top:8,right:8,left:0,bottom:0}}>
                <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:8.5,fill:C.t3}}/>
                <YAxis domain={[0,10]} tick={{fontSize:8.5,fill:C.t3}}/>
                <Tooltip content={<TipArea/>}/>
                <ReferenceLine y={7} stroke="#d97706" strokeDasharray="4 2"
                  label={{value:"target NPS 7.0",position:"right",fontSize:8,fill:"#d97706"}}/>
                <Line type="monotone" dataKey="nps" name="NPS" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false}/>
                <Line type="monotone" dataKey="sat" name="Satisfacción" stroke="#2563eb" strokeWidth={2} dot={false} isAnimationActive={false}/>
              </LineChart>
            </ResponsiveContainer>
            <div style={{display:"flex",gap:14,justifyContent:"center",marginTop:6}}>
              {[["#ef4444","NPS"],["#2563eb","Satisfacción"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:9.5,color:C.t2}}>
                  <div style={{width:16,height:2,background:c,borderRadius:1}}/>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contextual insight — changes based on month */}
        <div style={{marginTop:14,padding:"10px 14px",borderRadius:8,border:"1px solid",
          borderColor:month<=3?"#bfdbfe":month<=6?"#fef9c3":"#fecaca",
          background:month<=3?"#eff6ff":month<=6?"#fefce8":"#fef2f2"}}>
          <div style={{fontSize:10,fontWeight:700,marginBottom:3,
            color:month<=3?"#1e3a8a":month<=6?"#92400e":"#991b1b"}}>
            {month<=3?"🚀 Fase de lanzamiento":month<=6?"🎯 Hito de adopción":month<=12?"⚠️ Riesgo de engagement":"📉 Señal de retención"}
          </div>
          <div style={{fontSize:9.5,lineHeight:1.55,color:month<=3?"#1e40af":month<=6?"#78350f":"#7f1d1d"}}>
            {month<=3
              ? `${snap.n} carniceros se han registrado en los primeros ${month} meses. El producto acaba de llegar a un mercado no digital — cada nuevo usuario representa un cambio de comportamiento significativo.`
              : month<=6
              ? `Con ${snap.n} usuarios activos, myRAzept ha superado el 10% del mercado objetivo antes del mes 6. NPS de ${fmt(snap.nps)} pts indica adopción funcional pero engagement aún superficial.`
              : month<=12
              ? `El NPS de ${fmt(snap.nps)} pts muestra una tendencia a la baja respecto al mes 6 (${fmt(snapshots[5]?.nps||0)} pts). Los usuarios veteranos reportan menor satisfacción — señal de que la propuesta de valor no profundiza con el uso.`
              : `A mes ${month}, el NPS de ${fmt(snap.nps)} pts es preocupante. La retención de ${fmt(snap.ret,1)}% (low risk) se mantiene estructuralmente, pero el engagement profundo — co-creation, feature breadth — sigue siendo el gap crítico.`
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function RAPSDashboard(){
  const [selPillar,setSelPillar]=useState(null);
  const [animated,setAnimated]=useState(true);
  const [mxFilter,setMxFilter]=useState("all");
  const [selPersona,setSelPersona]=useState("all");

  const handleSelect=id=>{ setSelPillar(prev=>prev===id?null:id); setAnimated(false); setTimeout(()=>setAnimated(true),100); };

  const AT_RISK_TOT = KR_FRAME.flatMap(p=>p.krs).filter(k=>k.status==="at_risk").length;
  const ACHIEV_TOT  = KR_FRAME.flatMap(p=>p.krs).filter(k=>k.status==="achieved"||k.status==="exceeded").length;
  const card={background:C.card,borderRadius:12,border:`0.5px solid ${C.border}`,padding:"16px"};
  const sec={fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:2};

  // Live KR overrides — computed from real user data when a persona is selected
  // Only behavioral KRs update; structural/org KRs (CEO, testing rounds, depts) stay fixed
  const liveKRs = useMemo(() => {
    if (selPersona === "all") return {};
    const d = RAW.filter(r => r.p === selPersona);
    if (!d.length) return {};
    const a = k => +(d.reduce((s,r)=>s+(+r[k]||0),0)/d.length).toFixed(2);
    const p = fn => +(d.filter(fn).length/d.length*100).toFixed(1);
    const status = pct => pct >= 100 ? "achieved" : pct >= 70 ? "on_track" : "at_risk";
    const all = RAW;
    const base = k => +(all.reduce((s,r)=>s+(+r[k]||0),0)/all.length).toFixed(2);
    const basep = fn => +(all.filter(fn).length/all.length*100).toFixed(1);
    const delta = (live, b) => live - b;

    return {
      // P1 — behavioral KRs
      "P1-KR3": (() => { const v=a("fbs"); const pct=Math.round(v/1.0*100); return {val:`${v.toFixed(2)}`,target:"1.0",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("fbs")),live:true}; })(),
      "P1-KR4": (() => { const v=p(r=>r.ws===1); const pct=Math.round(v/25*100); return {val:`${v.toFixed(0)}%`,target:"25%",pct:Math.min(pct,100),status:status(pct),delta:delta(v,basep(r=>r.ws===1)),live:true}; })(),
      // P2 — behavioral KRs
      "P2-KR3": (() => { const v=a("fbr"); const pct=Math.round(v/5*100); return {val:`${v.toFixed(1)}/5`,target:"5/5",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("fbr")),live:true}; })(),
      "P2-KR4": (() => { const v=a("cr"); const pct=Math.round(v/3.0*100); return {val:`${v.toFixed(1)}`,target:"3.0",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("cr")),live:true}; })(),
      // P3 — behavioral KR
      "P3-KR3": (() => { const v=p(r=>r.coc===1); const pct=Math.round(v/15*100); return {val:`${v.toFixed(0)}%`,target:"15%",pct:Math.min(pct,100),status:status(pct),delta:delta(v,basep(r=>r.coc===1)),live:true}; })(),
      // P4 — behavioral KRs
      "P4-KR2": (() => { const v=a("nps"); const pct=Math.round(Math.max(0,v)/7*100); return {val:`${v.toFixed(1)}`,target:"7.0",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("nps")),live:true}; })(),
      "P4-KR3": (() => { const v=a("srd"); const pct=v===0?100:v<=3?100:Math.round(3/v*100); return {val:`${v.toFixed(1)}d`,target:"≤3",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("srd")),live:true}; })(),
      // P5 — brand perception behavioral
      "P5-KR2": (() => { const v=a("bpi"); const pct=Math.round(v/7.5*100); return {val:`${v.toFixed(1)}`,target:"7.5",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("bpi")),live:true}; })(),
      // P6 — behavioral KRs
      "P6-KR2": (() => { const v=a("sat"); const pct=Math.round(v/7.5*100); return {val:`${v.toFixed(1)}`,target:"7.5",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("sat")),live:true}; })(),
      "P6-KR3": (() => { const v=a("asp"); const pct=Math.round(v/35*100); return {val:`${v.toFixed(0)}%`,target:"35%",pct:Math.min(pct,100),status:status(pct),delta:delta(v,base("asp")),live:true}; })(),
      "P6-KR4": (() => { const v=p(r=>r.risk==="Low"); const pct=Math.round(v/90*100); return {val:`${v.toFixed(0)}%`,target:"90%",pct:Math.min(pct,100),status:status(pct),delta:delta(v,basep(r=>r.risk==="Low")),live:true}; })(),
    };
  }, [selPersona]);

  const radarData=[
    {s:"Conocimiento",a:8.5,t:9.0},{s:"Soluciones",a:7.2,t:9.0},
    {s:"Organización",a:6.8,t:8.0},{s:"Feedback",a:7.1,t:8.5},
    {s:"Alineación",a:7.8,t:9.0},{s:"Experiencia",a:6.5,t:8.5},
  ];
  const healthMap={P1:82,P2:82,P3:88,P4:85,P5:94,P6:88};
  const gapData=[
    {name:"Co-creation rate",      actual:8,  fill:"#d97706"},
    {name:"NPS promedio",          actual:56, fill:"#d97706"},
    {name:"Feature breadth",       actual:56, fill:"#d97706"},
    {name:"Surveys/usuario/mes",   actual:62, fill:"#2563eb"},
    {name:"Workshop participation",actual:64, fill:"#2563eb"},
    {name:"App spend penetration", actual:67, fill:"#2563eb"},
  ];
  const personaData=[
    {name:"Traditional Thomas",pct:40.6,color:"#92400e"},
    {name:"Skeptical Stefan",  pct:28.0,color:"#7f1d1d"},
    {name:"Pragmatic Peter",   pct:20.6,color:"#1e3a8a"},
    {name:"Digital Daniel",    pct:10.9,color:"#064e3b"},
  ];

  return(
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      {/* ── HEADER ── */}
      <header style={{background:C.header,padding:"12px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div>
          <h1 style={{margin:0,fontSize:17,fontWeight:700,color:"#f9fafb",letterSpacing:"-0.02em"}}>Smart KPIs & OKRs · RAPS / myRAzept</h1>
          <p style={{margin:"2px 0 0",fontSize:10,color:"#6b7280"}}>Innovación centrada en el cliente · 6 pilares · n=350 usuarios activos · mes 6</p>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:10,color:"#6b7280"}}>Segmento:</span>
          {/* "Todos" pill */}
          <button onClick={()=>setSelPersona("all")} style={{
            fontSize:10,padding:"4px 12px",borderRadius:20,cursor:"pointer",fontWeight:600,
            border:"1.5px solid #4b5563",
            background:selPersona==="all"?"#374151":"transparent",
            color:selPersona==="all"?"#fff":"#9ca3af",transition:"all .13s"}}>
            Todos · n=350
          </button>
          {/* Rich persona pills */}
          {[
            {k:"Thomas", pct:"40.6%", drs:"2.0–4.9", label:"Baja"},
            {k:"Stefan",  pct:"28.0%", drs:"1.2–5.3", label:"Muy baja"},
            {k:"Peter",   pct:"20.6%", drs:"3.6–6.5", label:"Media"},
            {k:"Daniel",  pct:"10.9%", drs:"6.3–9.6", label:"Alta"},
          ].map(({k,pct,drs,label})=>(
            <button key={k} onClick={()=>setSelPersona(k)}
              title={`${PFULL[k]}\nDigital readiness: ${drs}\n${pct} de usuarios activos`}
              style={{
                fontSize:10,padding:"4px 12px",borderRadius:20,cursor:"pointer",
                border:`1.5px solid ${PC[k]}`,
                background:selPersona===k?PC[k]:"transparent",
                color:selPersona===k?"#fff":PC[k],
                transition:"all .13s",display:"flex",alignItems:"center",gap:6,fontWeight:600}}>
              <span>{k}</span>
              <span style={{
                fontSize:9,fontWeight:400,opacity:0.85,
                borderLeft:`1px solid ${selPersona===k?"rgba(255,255,255,.4)":PC[k]+"66"}`,
                paddingLeft:6,lineHeight:1.2,textAlign:"left"}}>
                {label}<br/>{pct}
              </span>
            </button>
          ))}
          <div style={{width:1,height:20,background:"#374151"}}/>
          <div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(220,38,38,.15)",color:"#fca5a5",border:"1px solid rgba(220,38,38,.3)",borderRadius:20,padding:"4px 10px",fontSize:10,fontWeight:700}}>
            <AlertTriangle size={10}/> {AT_RISK_TOT} KRs críticos
          </div>
          <div style={{background:"rgba(5,150,105,.15)",color:"#6ee7b7",border:"1px solid rgba(5,150,105,.3)",borderRadius:20,padding:"4px 10px",fontSize:10,fontWeight:700}}>
            ✓ {ACHIEV_TOT} KRs logrados
          </div>
        </div>
      </header>

      <main style={{padding:"18px 28px 40px",maxWidth:1280,margin:"0 auto"}}>
        {/* ── 1. HERO KPIs ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:18}}>
          <HeroCard Icon={TrendingUp}   label="Adopción mercado"   value="11.5%"   pctRaw={100} status="achieved" target="≥10%"/>
          <HeroCard Icon={Star}         label="Satisfacción media"  value="6.5/10"  pctRaw={Math.round(6.5/7.5*100)} status="on_track" target="7.5"/>
          <HeroCard Icon={Users}        label="NPS promedio"        value="3.9 pts"  pctRaw={Math.round(3.9/7*100)}  status="at_risk"  target="7.0"/>
          <HeroCard Icon={Clock}        label="Ahorro tiempo"       value="3.9 hr"   pctRaw={Math.round(3.9/5*100)}  status="on_track" target="5.0 hr"/>
          <HeroCard Icon={ShoppingCart} label="App spend"           value="23%"      pctRaw={Math.round(23/35*100)}  status="on_track" target="35%"/>
          <HeroCard Icon={RefreshCw}    label="Retención"           value="92.6%"    pctRaw={Math.round(92.6/90*100)}status="achieved" target="≥90%"/>
        </div>

        {/* ── 2. MATRIX + RADAR ── */}
        <div style={{display:"grid",gridTemplateColumns:"3fr 1.05fr",gap:16,marginBottom:16}}>
          <div style={card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <div style={sec}>Matriz de KRs · 6 pilares × 4 Key Results = 24 KRs</div>
                <div style={{fontSize:9.5,color:C.t3}}>
                  {selPersona==="all"
                    ? "Valores baseline · todos los usuarios · click en celda para detalle ↓"
                    : <span>Celdas con borde coloreado = <span style={{fontWeight:700,color:"#059669"}}>KR recalculado</span> para <strong style={{color:PC[selPersona]}}>{PFULL[selPersona]}</strong> · ▲▼ = delta vs baseline</span>
                  }
                </div>
              </div>
              <div style={{display:"flex",gap:5}}>
                {[["all","Todos"],["at_risk","! Riesgo"],["on_track","→ Camino"],["achieved","✓ Logrado"]].map(([f,lbl])=>(
                  <button key={f} onClick={()=>setMxFilter(f)} style={{fontSize:9,padding:"3px 9px",borderRadius:12,cursor:"pointer",
                    border:`1px solid ${mxFilter===f?"#0d1117":C.border}`,background:mxFilter===f?"#0d1117":"transparent",
                    color:mxFilter===f?"#fff":C.t2,fontWeight:mxFilter===f?700:400,transition:"all .12s"}}>{lbl}</button>
                ))}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"108px repeat(4,1fr)",gap:6,marginBottom:6}}>
              <div style={{fontSize:9,color:C.t3,fontWeight:700,textTransform:"uppercase"}}>Pilar · Health</div>
              {["KR 1","KR 2","KR 3","KR 4"].map(h=><div key={h} style={{fontSize:9,color:C.t3,fontWeight:700,textAlign:"center",textTransform:"uppercase"}}>{h}</div>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"108px repeat(4,1fr)",gap:6}}>
              {KR_FRAME.map(pillar=>(
                <div key={pillar.pid} style={{display:"contents"}}>
                  <PillarSideCell id={pillar.pid} selected={selPillar===pillar.pid}
                    atRisk={pillar.krs.filter(k=>k.status==="at_risk").length}
                    onClick={()=>handleSelect(pillar.pid)}/>
                  {pillar.krs.map((kr,i)=>{
                    const overrideKey = `${pillar.pid}-${kr.k}`;
                    const override = liveKRs[overrideKey] || null;
                    const effectiveStatus = override ? override.status : kr.status;
                    return (
                      <MatrixCell key={i} kr={kr} override={override}
                        onClick={()=>handleSelect(pillar.pid)}
                        dimmed={mxFilter!=="all"&&!(mxFilter==="at_risk"?effectiveStatus==="at_risk":mxFilter==="on_track"?effectiveStatus==="on_track":effectiveStatus==="achieved"||effectiveStatus==="exceeded")}/>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div style={card}>
            <div style={sec}>Madurez por pilar (0–10)</div>
            <ResponsiveContainer width="100%" height={210}>
              <RadarChart data={radarData} margin={{top:12,right:34,bottom:4,left:34}}>
                <PolarGrid stroke="#e4e7ec"/>
                <PolarAngleAxis dataKey="s" tick={{fontSize:8.5,fill:C.t2}}/>
                <PolarRadiusAxis angle={90} domain={[0,10]} tick={{fontSize:8,fill:C.t3}} tickCount={4}/>
                <Radar name="Target" dataKey="t" stroke="#d1d5db" fill="#f3f4f6" fillOpacity={0.7} strokeDasharray="4 2"/>
                <Radar name="Actual" dataKey="a" stroke="#2563eb" fill="#2563eb" fillOpacity={0.14} strokeWidth={2}/>
                <Tooltip content={<TipRadar/>}/>
              </RadarChart>
            </ResponsiveContainer>
            <div style={{borderTop:`0.5px solid ${C.border}`,paddingTop:12,marginTop:8}}>
              <div style={{fontSize:9,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Score de salud · click = detalle</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {PM.map(m=>(
                  <div key={m.id} onClick={()=>handleSelect(m.id)}
                    style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",borderRadius:6,padding:"3px 5px",background:selPillar===m.id?m.bg:"transparent",transition:"background .12s"}}>
                    <span style={{fontSize:9,fontWeight:700,color:m.color,minWidth:18}}>{m.id}</span>
                    <div style={{flex:1,background:"#f3f4f6",borderRadius:3,height:5,overflow:"hidden"}}>
                      <div style={{height:"100%",background:m.color,width:`${healthMap[m.id]}%`,borderRadius:3}}/>
                    </div>
                    <span style={{fontSize:10,fontWeight:700,color:m.color,minWidth:26,textAlign:"right"}}>{healthMap[m.id]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {selPillar&&<PillarDetail id={selPillar} onClose={()=>setSelPillar(null)} animated={animated}/>}

        {/* ── 3. TIMELINE SLIDER (the interactive section) ── */}
        <TimelineSection selPersona={selPersona}/>

        {/* ── 4. GAP ANALYSIS + PERSONAS ── */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={card}>
            <div style={sec}>Análisis de brechas · KRs por urgencia</div>
            <div style={{fontSize:9.5,color:C.t3,marginBottom:12}}>Fondo gris = target (100%) · barra coloreada = progreso actual</div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={gapData} layout="vertical" margin={{top:0,right:80,left:0,bottom:0}}>
                <XAxis type="number" domain={[0,100]} tick={{fontSize:9,fill:C.t3}} tickFormatter={v=>`${v}%`}/>
                <YAxis type="category" dataKey="name" tick={{fontSize:9,fill:C.t2}} width={140}/>
                <Tooltip content={<TipGap/>}/>
                <ReferenceLine x={100} stroke="#0d1117" strokeDasharray="4 2" strokeWidth={1}/>
                <Bar dataKey="actual" radius={[0,3,3,0]} background={{fill:"#e4e7ec",radius:[0,3,3,0]}} label={<GapBarLabel/>}>
                  {gapData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{marginTop:10,background:"#fef2f2",borderRadius:8,padding:"9px 12px",border:"1px solid #fecaca"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#991b1b",marginBottom:3,display:"flex",alignItems:"center",gap:4}}>
                <AlertTriangle size={10}/> Diagnóstico estratégico
              </div>
              <div style={{fontSize:9.5,color:"#7f1d1d",lineHeight:1.55}}>
                Co-creation (8%), NPS (56%) y feature breadth (56%) comparten el mismo origen: <strong>usuarios de baja madurez digital que acceden pero no adoptan en profundidad</strong>. La estrategia debe atacar engagement, no solo acceso.
              </div>
            </div>
          </div>
          <div style={card}>
            <div style={sec}>Distribución de personas · preparación digital</div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={personaData} layout="vertical" margin={{top:0,right:42,left:0,bottom:0}}>
                <XAxis type="number" domain={[0,50]} tick={{fontSize:9,fill:C.t3}} tickFormatter={v=>`${v}%`}/>
                <YAxis type="category" dataKey="name" tick={{fontSize:9,fill:C.t2}} width={130}/>
                <Tooltip formatter={v=>[`${v}%`,"usuarios"]} contentStyle={{fontSize:11,borderRadius:6,border:`0.5px solid ${C.border}`}}/>
                <Bar dataKey="pct" radius={[0,4,4,0]} label={{position:"right",fontSize:10,fill:C.t2,formatter:v=>`${v}%`}}>
                  {personaData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
              <div style={{fontSize:9,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em"}}>Causa raíz · personas → gaps críticos</div>
              {[
                {who:"Thomas + Stefan (68.6%)",kpi:"NPS 3.9 — cae con antigüedad",why:"Acceden pero no dominan la app. NPS baja de 3.68 (mes 1-3) a 2.85 (mes 10-12).",c:"#92400e"},
                {who:"Thomas + Stefan",        kpi:"Feature breadth 2.8/5",why:"Solo usan gestión de recetas — el etiquetado (propuesta de valor #1) casi no se activa.",c:"#7f1d1d"},
                {who:"Stefan (28% de usuarios)",kpi:"56% riesgo de retención medio",why:"Mayor segmento con riesgo latente. Combinado con Thomas, el 68.6% de la base necesita intervención.",c:"#4c1d95"},
              ].map((r,i)=>(
                <div key={i} style={{background:"#f9fafb",borderRadius:8,padding:"8px 11px",border:`0.5px solid ${C.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:3,alignItems:"flex-start"}}>
                    <span style={{fontSize:10,fontWeight:700,color:r.c}}>{r.who}</span>
                    <span style={{fontSize:9.5,fontWeight:700,color:"#d97706",whiteSpace:"nowrap",flexShrink:0}}>→ {r.kpi}</span>
                  </div>
                  <div style={{fontSize:9.5,color:C.t2,lineHeight:1.4}}>{r.why}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{marginTop:20,paddingTop:12,borderTop:`0.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4,fontSize:10,color:C.t3}}>
          <span style={{fontWeight:600,color:C.t2}}>Josué Rodríguez Solís · Data Engineer & BI Analyst</span>
          <span>RAPS GmbH & Co. KG · myRAzept Analytics · Innovación centrada en el cliente · 2024</span>
        </div>
      </main>
    </div>
  );
}
