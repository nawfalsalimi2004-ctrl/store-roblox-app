import 'package:flutter/material.dart';

class AppTheme {
  // Brand Colors
  static const Color primaryRose = Color(0xFFE11D48); // rose-600
  static const Color secondaryAmber = Color(0xFFF59E0B); // amber-500
  static const Color accentIndigo = Color(0xFF6366F1); // indigo-500
  static const Color successEmerald = Color(0xFF10B981); // emerald-500
  
  // Dark Backgrounds
  static const Color darkBg = Color(0xFF020617); // slate-950
  static const Color darkCard = Color(0xFF0F172A); // slate-900
  static const Color darkCardBorder = Color(0xFF1E293B); // slate-800
  static const Color darkTextPrimary = Colors.white;
  static const Color darkTextSecondary = Color(0xFF94A3B8); // slate-400

  // Light Backgrounds
  static const Color lightBg = Color(0xFFF8FAFC);
  static const Color lightCard = Colors.white;
  static const Color lightCardBorder = Color(0xFFE2E8F0);
  static const Color lightTextPrimary = Color(0xFF0F172A);
  static const Color lightTextSecondary = Color(0xFF64748B);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: darkBg,
      primaryColor: primaryRose,
      colorScheme: const ColorScheme.dark(
        primary: primaryRose,
        secondary: secondaryAmber,
        surface: darkCard,
        background: darkBg,
      ),
      cardTheme: CardTheme(
        color: darkCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: darkCardBorder, width: 1),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: darkCard,
        elevation: 0,
        centerTitle: true,
      ),
    );
  }

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: lightBg,
      primaryColor: primaryRose,
      colorScheme: const ColorScheme.light(
        primary: primaryRose,
        secondary: secondaryAmber,
        surface: lightCard,
        background: lightBg,
      ),
      cardTheme: CardTheme(
        color: lightCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: lightCardBorder, width: 1),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: lightCard,
        elevation: 0,
        centerTitle: true,
      ),
    );
  }
}
