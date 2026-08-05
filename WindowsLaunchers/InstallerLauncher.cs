using System;
using System.Diagnostics;
using System.IO;

internal static class InstallerLauncher
{
    private static int Main()
    {
        Console.Title = "PokeTamagachi Installer";
        string root = AppDomain.CurrentDomain.BaseDirectory;
        Console.WriteLine("PokeTamagachi Installer");
        Console.WriteLine("========================");
        Console.WriteLine();

        if (!File.Exists(Path.Combine(root, "package.json")))
        {
            Console.WriteLine("ERROR: Keep this installer inside the downloaded PokeTamagachi folder.");
            return Finish(1);
        }

        if (!CommandSucceeds(root, "where npm >nul 2>nul"))
        {
            Console.WriteLine("ERROR: Node.js and npm were not found.");
            Console.WriteLine("Install Node.js from https://nodejs.org/ and try again.");
            return Finish(1);
        }

        Console.WriteLine("Installing the required files. This can take a few minutes...");
        Console.WriteLine();
        int exitCode = Run(root, "npm install");
        Console.WriteLine();
        Console.WriteLine(exitCode == 0
            ? "Installation complete. You can now open PokeTamagachi.exe."
            : "Installation failed. Review the npm message above and try again.");
        return Finish(exitCode);
    }

    private static bool CommandSucceeds(string root, string command)
    {
        return Run(root, command, true) == 0;
    }

    private static int Run(string root, string command, bool hidden = false)
    {
        var info = new ProcessStartInfo("cmd.exe", "/d /c " + command)
        {
            WorkingDirectory = root,
            UseShellExecute = false,
            CreateNoWindow = hidden,
            WindowStyle = hidden ? ProcessWindowStyle.Hidden : ProcessWindowStyle.Normal
        };
        using (Process process = Process.Start(info))
        {
            process.WaitForExit();
            return process.ExitCode;
        }
    }

    private static int Finish(int exitCode)
    {
        Console.WriteLine();
        Console.WriteLine("Press any key to close.");
        Console.ReadKey(true);
        return exitCode;
    }
}
