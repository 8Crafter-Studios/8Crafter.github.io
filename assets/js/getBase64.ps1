function b64 ($file_path) {
    $content = Get-Content -Path $file_path -Raw
    $byte_array = [System.Text.Encoding]::UTF8.GetBytes($content)
    $base64 = [System.Convert]::ToBase64String($byte_array)
    Write-Host "Original Content:" -foregroundcolor darkcyan
    # Write-Host $content
    Write-Host "--------------------------------------------" -foregroundcolor darkcyan
    Write-Host "Base64 Encoded Content:" -foregroundcolor darkcyan
    # Write-Host $base64
    Write-Host "--------------------------------------------" -foregroundcolor darkcyan
    Write-Host "+ Clipped" -foregroundcolor darkcyan
    Set-Clipboard -Value $base64
}
b64("C:\Users\ander\Downloads\8mb.video-2Kl-FHuG52vC.mp4");