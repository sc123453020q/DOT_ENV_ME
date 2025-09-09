import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("🌍 Eco Fighter Plane")

# Load Images
background_img = pygame.image.load("background.jpg")  # Use your own background image
plane_img = pygame.image.load("plane.png")            # Use a transparent plane image
enemy_img = pygame.image.load("enemy.png")           # Use a transparent pollution enemy image

# Resize Images
plane_img = pygame.transform.scale(plane_img, (60, 60))
enemy_img = pygame.transform.scale(enemy_img, (50, 50))

# Colors
WHITE = (255, 255, 255)
YELLOW = (255, 255, 0)

# Game Variables
player_x = WIDTH // 2 - 30
player_y = HEIGHT - 80
player_speed = 7

projectiles = []
enemies = []
ENEMY_EVENT = pygame.USEREVENT + 1
pygame.time.set_timer(ENEMY_EVENT, 800)

score = 0
lives = 3
font = pygame.font.SysFont('Arial', 28)

clock = pygame.time.Clock()

def draw_background():
    screen.blit(background_img, (0, 0))

def draw_player(x, y):
    screen.blit(plane_img, (x, y))

def draw_enemy(enemy):
    screen.blit(enemy_img, (enemy['x'], enemy['y']))

def draw_projectile(proj):
    pygame.draw.rect(screen, YELLOW, proj)

def show_score_lives():
    text = font.render(f"Score: {score} | Lives: {lives}", True, WHITE)
    screen.blit(text, (10, 10))

def game_over_screen():
    over_font = pygame.font.SysFont('Arial', 50)
    text = over_font.render(f"🚀 Game Over! Score: {score}", True, WHITE)
    screen.blit(text, (WIDTH//2 - 250, HEIGHT//2 - 50))
    pygame.display.update()
    pygame.time.wait(3000)
    pygame.quit()
    sys.exit()

# Game loop
running = True
while running:
    clock.tick(60)  # 60 FPS

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == ENEMY_EVENT:
            enemy_x = random.randint(0, WIDTH - 50)
            enemies.append({'x': enemy_x, 'y': -50})

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and player_x > 0:
        player_x -= player_speed
    if keys[pygame.K_RIGHT] and player_x < WIDTH - 60:
        player_x += player_speed
    if keys[pygame.K_SPACE]:
        if len(projectiles) < 5:
            projectiles.append(pygame.Rect(player_x + 25, player_y, 10, 20))

    # Update projectiles
    for proj in projectiles[:]:
        proj.y -= 10
        if proj.y < -20:
            projectiles.remove(proj)

    # Update enemies
    for enemy in enemies[:]:
        enemy['y'] += 5
        # Check collision with player
        enemy_rect = pygame.Rect(enemy['x'], enemy['y'], 50, 50)
        player_rect = pygame.Rect(player_x, player_y, 60, 60)

        if enemy_rect.colliderect(player_rect):
            lives -= 1
            enemies.remove(enemy)
            if lives <= 0:
                game_over_screen()

        # Check collision with projectiles
        for proj in projectiles[:]:
            if enemy_rect.colliderect(proj):
                score += 10
                if enemy in enemies:
                    enemies.remove(enemy)
                if proj in projectiles:
                    projectiles.remove(proj)

        if enemy['y'] > HEIGHT:
            enemies.remove(enemy)

    # Draw everything
    draw_background()
    show_score_lives()
    draw_player(player_x, player_y)

    for proj in projectiles:
        draw_projectile(proj)

    for enemy in enemies:
        draw_enemy(enemy)

    pygame.display.update()
