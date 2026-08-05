using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

internal static class AppLauncher
{
    [STAThread]
    private static void Main()
    {
        string root = AppDomain.CurrentDomain.BaseDirectory;
        if (!File.Exists(Path.Combine(root, "package.json")))
        {
            MessageBox.Show(
                "Keep PokeTamagachi.exe inside the downloaded PokeTamagachi folder.",
                "PokeTamagachi",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
            return;
        }

        if (!Directory.Exists(Path.Combine(root, "node_modules")))
        {
            MessageBox.Show(
                "Run PokeTamagachi Installer.exe first to install the required files.",
                "PokeTamagachi",
                MessageBoxButtons.OK,
                MessageBoxIcon.Information);
            return;
        }

        try
        {
            Process.Start(new ProcessStartInfo("cmd.exe", "/d /c npm start")
            {
                WorkingDirectory = root,
                UseShellExecute = false,
                CreateNoWindow = true,
                WindowStyle = ProcessWindowStyle.Hidden
            });
        }
        catch (Exception error)
        {
            MessageBox.Show(
                "PokeTamagachi could not start. Make sure Node.js is installed.\n\n" + error.Message,
                "PokeTamagachi",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
        }
    }
}
