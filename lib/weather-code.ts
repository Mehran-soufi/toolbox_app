import {
  Cloud,
  CloudRain,
  CloudSun,
  CloudLightning,
  Snowflake,
  Sun,
} from "lucide-react";


export const weatherCode = {

  0: {
    title: "صاف",
    icon: Sun,
    color: "text-yellow-400",
  },


  1: {
    title: "کمی ابری",
    icon: CloudSun,
    color: "text-orange-300",
  },


  2: {
    title: "نیمه ابری",
    icon: CloudSun,
    color: "text-sky-400",
  },


  3: {
    title: "ابری",
    icon: Cloud,
    color: "text-gray-400",
  },


  45: {
    title: "مه",
    icon: Cloud,
    color: "text-slate-400",
  },


  61: {
    title: "بارانی",
    icon: CloudRain,
    color: "text-blue-400",
  },


  71: {
    title: "برفی",
    icon: Snowflake,
    color: "text-cyan-300",
  },


  95: {
    title: "رعد و برق",
    icon: CloudLightning,
    color: "text-purple-400",
  },

};