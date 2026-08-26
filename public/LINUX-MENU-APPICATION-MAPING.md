# Linux Menu Application Mapping

## 1. Set Permissions

```bash
sudo chmod 4755 /opt/antigravity-ide/antigravity-ide
sudo chmod 4755 /opt/antigravity-ide/chrome-sandbox
```

## 2. Set Ownership

```bash
sudo chown root:root /opt/antigravity-ide/chrome-sandbox
```

## 3. Create Desktop Entry

```bash
micro ~/.local/share/applications/antigravity-ide.desktop
```

### Desktop Entry Content

```ini
[Desktop Entry]
Name=Antigravity IDE
Comment=Google Agent-first IDE
Exec=/opt/antigravity-ide/antigravity-ide
Icon=/opt/antigravity-ide/resources/app/resources/linux/code.png
Terminal=false
Type=Application
Categories=Development;IDE;
```
